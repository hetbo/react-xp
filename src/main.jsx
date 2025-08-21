import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className="h-screen text-white p-4 w-screen bg-neutral-900">
          <App />
      </div>
  </StrictMode>,
)
