import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import IssueDetails from '../_components/IssueDetails'
import EditIssueButton from "./../_components/EditIssueButton"

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
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton  issueId={issue.id} />
			</Box>
		</Grid>
	)
}

export default IssueDetailPage