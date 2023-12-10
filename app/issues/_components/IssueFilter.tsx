"use client";

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const STATUS_FILTER: { label: string, value: Status | "ALL" }[] = [
	{ label: 'All', value: "ALL" },
	{ label: 'Open', value: "OPEN" },
	{ label: 'Closed', value: "CLOSED" },
	{ label: 'Progress', value: 'IN_PROGRESS' }
]

const IssueFilter = () => {
	const router = useRouter()
	const searchParams = useSearchParams();
	const status = searchParams.get('status') || STATUS_FILTER[0].value;

	const handleChangeFilter = (status: Status | "ALL") => {
		const params = new URLSearchParams();
		const allStatuses = Object.values(Status);

		if (allStatuses.some(s => s === status)) {
			params.append('status', status);
		}
		if (searchParams.get('orderBy')) {
			params.append('orderBy', searchParams.get('orderBy')!);
		}

		const query = params.size ? "?" + params.toString() : '';
		router.push('/issues' + query);
	}

	return (
		<Select.Root defaultValue={status} onValueChange={handleChangeFilter}>
			<Select.Trigger placeholder="Filter by status..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{STATUS_FILTER.map(status => (
						<Select.Item
							key={status.value}
							value={status.value}
						>
							{status.label}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default IssueFilter;