"use client";

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const STATUS_FILTER: { label: string, value: Status | "ALL" }[] = [
	{ label: 'All', value: "ALL" },
	{ label: 'Open', value: "OPEN" },
	{ label: 'Closed', value: "CLOSED" },
	{ label: 'Progress', value: 'IN_PROGRESS' }
]

const IssueFilter = () => {
	return (
		<Select.Root defaultValue={STATUS_FILTER[0].value} >
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

export default IssueFilter