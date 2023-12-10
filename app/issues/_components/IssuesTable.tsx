import { Link as CustomLink, IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { FunctionComponent } from 'react';

export interface IIssueQuery {
	status: Status;
	orderBy: IColumn['value'];
	page: string;
}

interface IIssuesTableProps {
	searchParams: IIssueQuery
	issues: Issue[];
}

const IssuesTable: FunctionComponent<IIssuesTableProps> = ({searchParams, issues} ) => {
	return (
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
	)
}

type OrderByValue = Pick<Issue, 'createdAt' | 'title' | 'status'>;
interface IColumn {
	label: string;
	value: keyof OrderByValue;
	className?: string;
}

const columns: IColumn[] = [
	{ label: "Title", value: "title", className: "" },
	{ label: "Status", value: "status", className: "hidden md:table-cell" },
	{ label: "Created", value: "createdAt", className: "hidden md:table-cell" }
];

export const columnsValues = columns.map(col => col.value);


export default IssuesTable;