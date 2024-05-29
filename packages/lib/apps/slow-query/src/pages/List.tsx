import { Link } from 'react-router-dom'
import { useAppContext } from '../context'
import { useQuery } from '@tanstack/react-query'
import { useListUrlState } from '../list-url-state'

export function List() {
  const ctx = useAppContext()
  const { term, setTerm } = useListUrlState()

  const { data: slowQueryList, isLoading } = useQuery({
    queryKey: ['slow-query', 'list', term],
    queryFn: () => {
      return ctx.api.getSlowQueries({ term })
    }
  })

  function handleSubmit(ev: any) {
    ev.preventDefault()
    setTerm(ev.target.term.value)
  }

  return (
    <div>
      <h1 className="text-3xl p-4">{ctx.cfg.title ?? 'Slow Query App'}</h1>

      {ctx.cfg.showSearch && (
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="term"
              placeholder="Search"
              className="p-2 w-full rounded-md border-gray-200 border shadow-sm sm:text-sm"
              defaultValue={term}
            />
          </form>
        </div>
      )}

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
                    style={{ backgroundColor: 'var(--color-primary, #4f46e5)' }}
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
