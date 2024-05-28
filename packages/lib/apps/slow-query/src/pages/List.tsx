import { Link } from 'react-router-dom'
import { useAppContext } from '../context'
import { useQuery } from '@tanstack/react-query'

export function List() {
  const ctx = useAppContext()

  const { data: slowQueryList, isLoading } = useQuery({
    queryKey: ['slow-query', 'list'],
    queryFn: () => {
      return ctx.api.getSlowQueries({ term: '' })
    }
  })

  return (
    <div>
      <h1 className="text-3xl">{ctx.cfg.title ?? 'Slow Query App'}</h1>

      {isLoading && <p>Loading...</p>}
      {slowQueryList && (
        <table>
          <thead>
            <tr>
              <td>Query</td>
              <td>Latency</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {slowQueryList.map((s: any) => (
              <tr key={s.id}>
                <td>{s.query}</td>
                <td>{s.latency}</td>
                <td>
                  <Link
                    to={`/detail?id=${s.id}`}
                    className="hover:text-blue-400"
                  >
                    detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
