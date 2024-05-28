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
            title: 'Slow Query (Portal 1)'
          }
        })
      })
    } else if (path === '/statement') {
      import('/apps/statement/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container',
          cfg: {
            title: 'Statement (Portal 1)'
          }
        })
      })
    }
  }, [])

  return (
    <div className="flex min-h-full">
      <div className="w-40 p-2">
        <h1 className="font-bold">Portal 1</h1>
        <nav>
          <ul>
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
