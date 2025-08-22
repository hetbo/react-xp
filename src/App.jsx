// src/App.jsx

import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';

// Import all the major page/feature components we have built
import NextTodo from './components/NextTodo.jsx';
import StockWatchlistPage from './pages/StockWatchlistPage';
import UserDashboardPage from './features/user-dashboard/UserDashboardPage.jsx';

// A simple component for the home page
const HomePage = () => (
    <div>
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">React Learning Hub</h1>
        <p className="text-lg text-gray-300">
            Welcome! Use the menu on the left to navigate between the different complex examples
            we've built. Each one demonstrates a different set of core React concepts.
        </p>
    </div>
);

function App() {
    // This function determines the style for our navigation links
    const getNavLinkClass = ({isActive}) => {
        const baseClasses = "block w-full text-left px-4 py-2 rounded-md transition-colors duration-200";
        if (isActive) {
            return `${baseClasses} bg-cyan-500 text-white font-semibold`;
        }
        return `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    };

    return (
        // BrowserRouter is the top-level component that enables routing
        <BrowserRouter>
            <div
                className="h-[97vh] flex font-sans bg-gray-900 text-white">
                {/* --- Sidebar Navigation --- */}
                <nav className="w-64 bg-gray-800 p-4 shrink-0">
                    <h2 className="text-xl font-bold text-white mb-6">Examples Menu</h2>
                    <ul className="space-y-2">
                        <li><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/todo" className={getNavLinkClass}>1. To-Do List</NavLink></li>
                        <li><NavLink to="/stock-watchlist" className={getNavLinkClass}>2. Stock Watchlist</NavLink></li>
                        <li><NavLink to="/user-dashboard" className={getNavLinkClass}>3. User Dashboard</NavLink></li>
                    </ul>
                </nav>

                {/* --- Main Content Area --- */}
                <main className="flex-grow p-8">
                    {/* The Routes component renders the matching Route's element */}
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/todo" element={<NextTodo/>}/>
                        <Route path="/stock-watchlist" element={<StockWatchlistPage/>}/>
                        <Route path="/user-dashboard" element={<UserDashboardPage/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;