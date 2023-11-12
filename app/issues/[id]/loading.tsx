import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
	return (
		<Box className='max-w-xl space-y-3'>
			<Skeleton />
      <Flex gap={"3"}>
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
			<Card>
				<Skeleton count={3} />
			</Card>
		</Box>
	)
}

export default LoadingIssueDetailPage 