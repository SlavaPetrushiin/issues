'use client';
import Link from 'next/link'
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from "next/navigation";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';

const NavBar = () => {
	const { data: session } = useSession()
	const currentPath = usePathname();
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" }
	]

	return (
		<nav className='flex items-center space-x-6 px-5 border-solid border-b mb-5 h-14'>
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
			{ session && <Link href="/api/auth/signout">Sign out</Link>}
			{ !session && <Link href="/api/auth/signin">SignIn</Link>}
		</nav>
	)
}

export default NavBar;