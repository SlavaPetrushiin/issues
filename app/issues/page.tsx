import React from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div>
			<div className='mb-5'>
				<Button>
					<Link href={"/issues/new"}>
						New issue
					</Link>
				</Button>
			</div>

			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map(issue => {
						return (
							<Table.Row key={issue.id}>
								<Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
								<Table.Cell>{issue.status}</Table.Cell>
								<Table.Cell>{issue.createdAt.toLocaleDateString()}</Table.Cell>
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table.Root>
		</div>
	)
}

export default IssuesPage