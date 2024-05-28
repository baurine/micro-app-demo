import { Link } from 'react-router-dom'
import { useAppContext } from '../context'

export function Detail() {
  const cxt = useAppContext()

  return (
    <div>
      <h1>{cxt.cfg.title ?? 'Slow Query App'}</h1>
      <Link to="/">{'<-- back to list page'}</Link>
    </div>
  )
}
