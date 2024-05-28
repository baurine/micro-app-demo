import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppOptions } from './type.ts'
import { AppProvider } from './context-provider.tsx'

export default function (options: AppOptions) {
  ReactDOM.createRoot(document.getElementById(options.containerId)!).render(
    <React.StrictMode>
      <div id="slow-query-app-root">
        <AppProvider ctxValue={options}>
          <App />
        </AppProvider>
      </div>
    </React.StrictMode>
  )
}
