"use client";

import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { FunctionComponent } from 'react'

interface IIssueSummaryProps {
	closed: number;
	open: number;
	inProgress: number;
}

const IssueChart: FunctionComponent<IIssueSummaryProps> = ({ closed, inProgress, open }) => {
	const containers: {
		label: string,
		value: number,
		status: Status
	}[] = [
			{ label: 'Open Issues', value: open, status: Status.OPEN },
			{ label: 'In-progress Issues', value: inProgress, status: Status.IN_PROGRESS },
			{ label: 'Closed Issues', value: closed, status: Status.CLOSED },
		]

	return (
		<Flex gap={"4"}>
			{containers.map(container => (
				<Card key={container.label}>
					<Flex direction="column">
						<Link
							className='text-sm font-medium'
							href={`/issues?status=${container.status}`}
						>
							{container.label}
						</Link>
						<Text size="5" className='font-bold'>{container.value}</Text>
					</Flex>
				</Card>
			))}
		</Flex>
	)
}

export default IssueChart