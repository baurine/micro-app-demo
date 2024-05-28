import { useEffect } from 'react'

import sampleData from './sample-data.json'

import './App.css'

// should move to utils lib
function loadCSS(cssFilePath: string) {
  var head = document.getElementsByTagName('head')[0]

  // Creating link element
  var style = document.createElement('link')
  style.href = cssFilePath
  style.type = 'text/css'
  style.rel = 'stylesheet'
  head.append(style)
}

function App() {
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/slow-query') {
      loadCSS('/apps/slow-query/style.css')
      import('/apps/slow-query/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container',
          cfg: {
            title: 'Slow Query (Portal 2)'
          },
          api: {
            getSlowQueries(params: { term: string }) {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(sampleData)
                }, 4000)
              })
            },
            getSlowQuery(params: { id: number }) {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const slowQuery = sampleData.find((s) => s.id === params.id)
                  resolve(slowQuery)
                }, 4000)
              })
            }
          }
        })
      })
    } else if (path === '/statement') {
      loadCSS('/apps/statement/style.css')
      import('/apps/statement/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container'
        })
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-2 border flex flex-none gap-4">
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
      <div id="app-container" className="flex-auto">
        {/* app container */}
      </div>
    </div>
  )
}

export default App
