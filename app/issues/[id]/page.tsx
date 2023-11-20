import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import IssueDetails from '../_components/IssueDetails'
import EditIssueButton from "./../_components/EditIssueButton"
import DeleteIssueButton from '../_components/DeleteIssueButton'

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
	if (Number.isNaN(+params.id)) notFound()

	const issue = await prisma.issue.findUnique({
		where: {
		id: parseInt(params.id)
		}
	})

	if (!issue) notFound()

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap="5">
			<Box className='space-y-3 sm:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			<Flex gap="3" direction="column">
				<EditIssueButton  issueId={issue.id} />
				<DeleteIssueButton issueId={issue.id}/>
			</Flex>
		</Grid>
	)
}

export default IssueDetailPage