import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// startApp(options)
export default function (options: any) {
  ReactDOM.createRoot(document.getElementById(options.containerId)!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
