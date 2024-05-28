import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/slow-query') {
      import('/apps/slow-query/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container',
          cfg: {
            title: 'Slow Query (Portal 2)'
          }
        })
      })
    } else if (path === '/statement') {
      import('/apps/statement/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container'
        })
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-2 border flex flex-none gap-2">
        <h1 className="font-bold">Portal 2</h1>
        <nav>
          <ul className="flex gap-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/slow-query">Slow Query</a>
            </li>
            <li>
              <a href="/statement">Statement</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="app-container" className="flex-auto p-2">
        app container
      </div>
    </div>
  )
}

export default App
