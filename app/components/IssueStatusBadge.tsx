import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React, { FunctionComponent } from 'react'


interface IIssueStatusBadgeProps {
	status: Status;
}

const mapStatus: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge: FunctionComponent<IIssueStatusBadgeProps> = ({ status }) => {
	return (
		<Badge color={mapStatus[status].color}>
			{mapStatus[status].label}
		</Badge>
	)
}

export default IssueStatusBadge