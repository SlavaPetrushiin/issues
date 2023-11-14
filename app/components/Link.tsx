import { Link as RadixLink } from '@radix-ui/themes';
import NextLink from 'next/link';
import React, { ReactNode } from 'react'

const Link = ({href, children}: {href: string, children: ReactNode}) => {
	return (
		<div>
			<NextLink href={href} passHref legacyBehavior>
				<RadixLink>
					{children}
				</RadixLink>
			</NextLink>
		</div>
	)
}

export default Link