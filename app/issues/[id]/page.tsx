import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
	if (Number.isNaN(+params.id)) notFound()

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id)
		}
	})

	if (!issue) notFound()

	return (
		<div className='prose space-y-3 max-w-xl'>
			<Heading as='h2' className='capitalize'>{issue.title}</Heading>
			<Flex gap={"3"}>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toLocaleDateString()}</Text>
			</Flex>
			<Card>
				<Markdown>{issue.description}</Markdown>
			</Card>
		</div>
	)
}

export default IssueDetailPage