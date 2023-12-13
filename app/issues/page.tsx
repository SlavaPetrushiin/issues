import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import Pagination from '../components/Pagination';
import IssueActions from './_components/IssueActions';
import IssuesTable, { IIssueQuery, columnsValues } from './_components/IssuesTable';
import { Metadata } from 'next';

const IssuesPage = async ({ searchParams }: { searchParams: IIssueQuery }) => {
	const statuses = Object.values(Status);

	//Params for request
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;
	const where = { status };
	const orderBy = columnsValues.includes(searchParams.orderBy)
		? {[searchParams.orderBy]: "asc"}
		: undefined;
	
	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;
	const skip = (page - 1) * pageSize;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({where})

	return (
		<Flex gap={"3"} direction={"column"}>
			<IssueActions />
			<IssuesTable issues={issues} searchParams={searchParams} />
			<Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
		</Flex>
	)
}

export const dynamic = 'force-dynamic';

export default IssuesPage

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};