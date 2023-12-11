import LatestIssues from './LatestIssues';
import Pagging from './components/Pagination'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div>
      <LatestIssues />
    </div>
  )
}
