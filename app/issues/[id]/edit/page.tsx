import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'

const EditIssuePage =  async({params}: {params: {id: string}}) => {
	if (Number.isNaN(+params.id)) notFound()

	const issue = await prisma.issue.findUnique({
		where: {id: parseInt(params.id) }
	})

	if(!issue) notFound()

	return (
		<IssueForm issue={issue}/>
	)
}

export default EditIssuePage