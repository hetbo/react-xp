import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SimpleTodo from "./components/SimpleTodo.jsx";
import NextTodo from "./components/NextTodo.jsx";
import StockWatchlistPage from "./pages/StockWatchListPage.jsx";

createRoot(document.getElementById('root')).render(
      <div className="h-screen text-white p-4 w-screen bg-neutral-900">
{/*
          <SimpleTodo />
          <NextTodo />
*/}

            <StockWatchlistPage />

      </div>
,
)
