import { Link } from 'react-router-dom'
import { useAppContext } from '../context'
import { useDetailUrlState } from '../detail-url-state'
import { useQuery } from '@tanstack/react-query'

export function Detail() {
  const cxt = useAppContext()
  const { id } = useDetailUrlState()

  const { data: detailData, isLoading } = useQuery({
    queryKey: ['slow_query', 'detail', id],
    queryFn: () => {
      return cxt.api.getSlowQuery({ id })
    }
  })
  const detail = detailData as any

  return (
    <div className="p-4">
      <h1 className="text-3xl">{cxt.cfg.title ?? 'Slow Query App'}</h1>
      <div className="py-4">
        {isLoading && <p>Loading...</p>}
        {detail && (
          <div>
            <p>ID: {detail.id}</p>
            <p>Query: {detail.query}</p>
            <p>Latency: {detail.latency}</p>
          </div>
        )}
      </div>
      <Link to="/">{'<-- back to list page'}</Link>
    </div>
  )
}
