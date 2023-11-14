import { Table } from '@radix-ui/themes'
import IssueActions from './_components/IssueActions';
import {Skeleton} from '@/app/components'

export default function Loading() {
	const count = new Array(5).fill("");
	return (
		<div>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>
							Title
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{count.map((_, index) => {
						return (
							<Table.Row key={index}>
								<Table.RowHeaderCell>
									<Skeleton />
								</Table.RowHeaderCell>
								<Table.Cell className='hidden md:table-cell'>
									<Skeleton />
								</Table.Cell >
								<Table.Cell className='hidden md:table-cell'>
									<Skeleton />
								</Table.Cell>
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table.Root>
		</div>
	)
}