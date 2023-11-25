'use client';
import Link from 'next/link'
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from "next/navigation";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
	const { data: session, status } = useSession()
	const currentPath = usePathname();
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" }
	]

	return (
		<nav className='border-b mb-5 px-5 py-3'>
			<Container>
				<Flex justify="between" align="center">
					<Flex align="center" gap="3">
						<div>
							<Link href="/">
								<AiFillBug />
							</Link>
						</div>
						<ul className='flex space-x-6'>
							{links.map(link => {
								return (
									<Link
										key={link.href}
										href={link.href}
										className={classNames(
											"hover:text-zinc-800 transition-colors",
											{
												"text-zinc-900": currentPath === link.href,
												"text-zinc-500": currentPath !== link.href,
											})}
									>
										{link.label}
									</Link>
								)
							})}
						</ul>
					</Flex>
					<Box>
						{status === "authenticated" && <DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Flex gap="2">
									<Avatar
										src={session.user?.image!}
										fallback="?"
										radius='full'
										size='2'
										className='cursor-pointer'
									/>
								</Flex>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Label>
									<Text size="2">{session.user?.email}</Text>
								</DropdownMenu.Label>
								<DropdownMenu.Item>
									<Link href="/api/auth/signout">Sign out</Link>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>}
						{status === "unauthenticated" && <Link href="/api/auth/signin">SignIn</Link>}
					</Box>
				</Flex>
			</Container>
		</nav>
	)
}

export default NavBar;