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
      <h1 className="text-3xl p-4">{ctx.cfg.title ?? 'Slow Query App'}</h1>

      {isLoading && <p className="pl-4">Loading...</p>}
      {slowQueryList && (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Query
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Latency
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slowQueryList.map((s: any) => (
              <tr key={s.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {s.query}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {s.latency}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/detail?id=${s.id}`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
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
