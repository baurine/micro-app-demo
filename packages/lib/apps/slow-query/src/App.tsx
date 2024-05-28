import { useAppContext } from './context'

function App() {
  const cxt = useAppContext()

  return <h1>{cxt.cfg.title ?? 'Slow Query App'}</h1>
}

export default App
