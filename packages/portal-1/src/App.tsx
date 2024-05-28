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
    if (path.startsWith('/slow-query')) {
      loadCSS('/apps/slow-query/style.css')
      import('/apps/slow-query/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container',
          cfg: {
            title: 'Slow Query (Portal 1)',
            showSearch: true
          },
          api: {
            getSlowQueries(params: { term: string }) {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const filteredData = sampleData.filter((s) =>
                    s.query.includes(params.term)
                  )
                  resolve(filteredData)
                }, 2000)
              })
            },
            getSlowQuery(params: { id: number }) {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const slowQuery = sampleData.find((s) => s.id === params.id)
                  resolve(slowQuery)
                }, 2000)
              })
            }
          }
        })
      })
    } else if (path.startsWith('/statement')) {
      loadCSS('/apps/statement/style.css')
      import('/apps/statement/lib.js?url').then((mod) => {
        mod.default({
          containerId: 'app-container'
        })
      })
    } else {
      const el = document.querySelector('#app-container')
      el!.innerHTML = `<p class="p-4">app container for ${path}</p>`
    }
  }, [])

  return (
    <div className="flex">
      <div className="w-40 p-2 h-screen border">
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
            <li>
              <a href="/billing">Billing</a>
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
