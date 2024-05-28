import { Link } from 'react-router-dom'
import { useAppContext } from '../context'

export function List() {
  const cxt = useAppContext()

  return (
    <div>
      <h1>{cxt.cfg.title ?? 'Slow Query App'}</h1>
      <Link to={'/detail'}>Go to Detail Page</Link>
    </div>
  )
}
