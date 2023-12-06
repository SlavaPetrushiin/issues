import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueFilter from './IssueFilter'

const IssueActions = () => {
	return (
		<Flex justify="between" className='mb-5'>
			<IssueFilter />
			<Button>
				<Link href={"/issues/new"}>
					New issue
				</Link>
			</Button>
		</Flex>
	)
}

export default IssueActions