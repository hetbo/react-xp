import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
      <div className="min-h-screen text-white p-4 bg-neutral-900">
            <App />
      </div>
,
)
