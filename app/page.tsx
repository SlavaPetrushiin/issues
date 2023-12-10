import Pagging from './components/Pagination'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div>
      <Pagging currentPage={currentPage} pageSize={10} itemCount={100} />
    </div>
  )
}
