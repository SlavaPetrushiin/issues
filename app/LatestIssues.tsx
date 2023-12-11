import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Table, Text } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge } from './components'

const LatestIssues = async () => {
	const latestIssues = await prisma.issue.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			assignedToUser: true,
		},
		take: 5
	})

	return (
		<Card>
			<Table.Root>
				<Table.Body>
					{latestIssues.map(issue => (
						<Table.Row key={issue.id} className=''>
							<Table.Cell>
								<Flex justify="between">
									<Flex direction="column" gap="1" align="start">
										<Text>{issue.title}</Text>
										<Text>{new Date(issue.createdAt).toLocaleDateString() }</Text>
										<IssueStatusBadge status={issue.status} />
									</Flex>
									<Avatar
										fallback="?"
										radius='full'
										size="3"
										src={issue.assignedToUser?.image!}
									/>
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	)
}

export default LatestIssues;