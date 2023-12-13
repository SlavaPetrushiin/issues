import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import IssueDetails from '../_components/IssueDetails'
import EditIssueButton from "./../_components/EditIssueButton"
import DeleteIssueButton from '../_components/DeleteIssueButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/configs/authOptions'
import { AssigneeSelect } from '../_components/AssigneeSelect'
import { cache } from 'react'

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId }}));

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
	if (Number.isNaN(+params.id)) notFound()

	const session = await getServerSession(authOptions);

	const issue = await fetchUser(parseInt(params.id));

	if (!issue) notFound()

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap="5">
			<Box className='space-y-3 sm:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			{session && <Flex gap="3" direction="column">
				<AssigneeSelect issue={issue} />
				<EditIssueButton  issueId={issue.id} />
				<DeleteIssueButton issueId={issue.id}/>
			</Flex>}
		</Grid>
	)
}

export default IssueDetailPage

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}