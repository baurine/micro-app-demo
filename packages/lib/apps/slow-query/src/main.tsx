import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import { AppOptions } from './type.ts'
import { AppProvider } from './context-provider.tsx'

import './index.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
      // retry: 1
      // refetchOnMount: false,
      // refetchOnReconnect: false,
    }
  }
})

export default function (options: AppOptions) {
  ReactDOM.createRoot(document.getElementById(options.containerId)!).render(
    <React.StrictMode>
      <div id="slow-query-app-root">
        <QueryClientProvider client={queryClient}>
          <AppProvider ctxValue={options}>
            <App />
          </AppProvider>
        </QueryClientProvider>
      </div>
    </React.StrictMode>
  )
}
