'use client';
import Link from 'next/link'
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from "next/navigation";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
	const { data: session, status } = useSession()
	const currentPath = usePathname();
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" }
	]

	return (
		<nav className='border-solid border-b mb-5 px-5 py-3'>
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
						{status === "authenticated" && <Link href="/api/auth/signout">Sign out</Link>}
						{status === "unauthenticated" && <Link href="/api/auth/signin">SignIn</Link>}
					</Box>
				</Flex>
			</Container>
		</nav>
	)
}

export default NavBar;