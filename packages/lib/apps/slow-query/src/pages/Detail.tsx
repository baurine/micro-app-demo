import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { useDetailUrlState } from './detail-url-state'
import { useAppContext } from '../context'

export function Detail() {
  const cxt = useAppContext()
  const { id } = useDetailUrlState()

  const { data: detailData, isLoading } = useQuery({
    queryKey: ['slow_query', 'detail', id],
    queryFn: () => {
      return cxt.api.getSlowQuery({ id })
    }
  })

  return (
    <div className="p-4">
      <h1 className="text-3xl">{cxt.cfg.title ?? 'Slow Query App'}</h1>
      <div className="py-4">
        {isLoading && <p>Loading...</p>}
        {detailData && (
          <div>
            <p>ID: {detailData.id}</p>
            <p>Query: {detailData.query}</p>
            <p>Latency: {detailData.latency}</p>
          </div>
        )}
      </div>
      <Link to="/">{'<-- back to list page'}</Link>
    </div>
  )
}
