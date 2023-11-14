import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'

const IssueDetails = ({issue}: {issue: Issue}) => {
	return (
		<>
			<Heading as='h2' className='capitalize'>{issue.title}</Heading>
			<Flex gap={"3"}>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toLocaleDateString()}</Text>
			</Flex>
			<Card >
				<Markdown>{issue.description}</Markdown>
			</Card>
		</>
	)
}

export default IssueDetails