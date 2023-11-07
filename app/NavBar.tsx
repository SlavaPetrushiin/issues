import Link from 'next/link'
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
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
							className='text-zinc-500 hover:text-zinc-800 transition-colors'
						>
							{link.label}
						</Link>
					)
				})}
			</ul>
		</nav>
	)
}

export default NavBar;