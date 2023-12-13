import prisma from '@/prisma/client';
import IssueSummary from './IssueChart';
import LatestIssues from './LatestIssues';
import { Flex, Grid } from '@radix-ui/themes';
import ChartSummary from './ChartSummary';
import { Metadata } from 'next';


const Dashboard = async () => {
  // const issuesCount = await prisma.issue.groupBy({
  //   by: "status",
  //   _count: {
  //     status: true,
  //   },
  // })

  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary closed={closed} inProgress={inProgress} open={open} />
        <ChartSummary closed={closed} inProgress={inProgress} open={open}/>
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export default Dashboard

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};