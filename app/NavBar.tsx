'use client';
import { Skeleton } from '@/app/components';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
	return (
		<nav className='border-b mb-5 px-5 py-3'>
			<Container>
				<Flex justify="between" align="center">
					<Flex align="center" gap="3">
							<Link href="/">
								<AiFillBug />
							</Link>
							<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	)
}

export default NavBar;


const AuthStatus = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <Skeleton width="3rem" height="1rem"/>
	}

	if (status === "unauthenticated") {
		return (
			<Link href="/api/auth/signin" className='nav-link'>SignIn</Link>
		)
	}

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Flex gap="2">
						<Avatar
							src={session!.user?.image!}
							fallback="?"
							radius='full'
							size='2'
							className='cursor-pointer'
						/>
					</Flex>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="2">{session!.user?.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href="/api/auth/signout">Sign out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	)
}

const NavLinks = () => {
	const currentPath = usePathname();
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" }
	]

	return (
		<ul className='flex space-x-6'>
			{links.map(link => {
				return (
					<Link
						key={link.href}
						href={link.href}
						className={classNames(
							{
								"!text-zinc-900": currentPath === link.href,
								"nav-link": true,
							})}
					>
						{link.label}
					</Link>
				)
			})}
		</ul>
	)
}