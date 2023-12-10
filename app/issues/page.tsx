import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueActions from './_components/IssueActions'
import { IssueStatusBadge, Link as CustomLink } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '../components/Pagination';

interface ISearchParamsProps {
	status: Status;
	orderBy: IColumn['value'];
	page: string;
}

type OrderByValue = Pick<Issue, 'createdAt' | 'title' | 'status'>;
interface IColumn {
	label: string;
	value: keyof OrderByValue;
	className?: string;
}

const IssuesPage = async ({ searchParams }: { searchParams: ISearchParamsProps }) => {
	const statuses = Object.values(Status);
	const columns: IColumn[] = [
		{ label: "Title", value: "title", className: "" },
		{ label: "Status", value: "status", className: "hidden md:table-cell" },
		{ label: "Created", value: "createdAt", className: "hidden md:table-cell" }
	]

	//Params for request
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;
	const where = { status };
	const orderBy = columns.find((c) => c.value === searchParams.orderBy)
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
		<div>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{
							columns.map(column => {
								return (
									<Table.ColumnHeaderCell key={column.value} className={column.className}>
										<Link href={{
											query: { ...searchParams, orderBy: column.value }
										}}>{column.label}</Link>
										{column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
									</Table.ColumnHeaderCell>

								)
							})
						}
					</Table.Row>

				</Table.Header>
				<Table.Body>
					{issues.map(issue => {
						return (
							<Table.Row key={issue.id}>
								<Table.RowHeaderCell>
									<CustomLink href={`/issues/${issue.id}`}>
										{issue.title}
									</CustomLink>
									<div className={'block mt-1 md:hidden'}>
										<IssueStatusBadge status={issue.status} />
									</div>
								</Table.RowHeaderCell>
								<Table.Cell className='hidden md:table-cell'>
									<IssueStatusBadge status={issue.status} />
								</Table.Cell >
								<Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleDateString()}</Table.Cell>
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table.Root>
			<Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
		</div>
	)
}

export const dynamic = 'force-dynamic';

export default IssuesPage