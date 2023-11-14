import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'



const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
	if (Number.isNaN(+params.id)) notFound()

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id)
		}
	})

	if (!issue) notFound()

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap="5">
			<Box className='space-y-3'>
				<Heading as='h2' className='capitalize'>{issue.title}</Heading>
				<Flex gap={"3"}>
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.createdAt.toLocaleDateString()}</Text>
				</Flex>
				<Card >
					<Markdown>{issue.description}</Markdown>
				</Card>
			</Box>
			<Box>
				<Button>
					<Pencil2Icon />
					<Link href={`/issues/${issue.id}/edit`}>
						Edit Issue
					</Link>
				</Button>
			</Box>
		</Grid>
	)
}

export default IssueDetailPage