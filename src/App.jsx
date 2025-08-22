import {BrowserRouter, Routes, Route, NavLink, useNavigate} from 'react-router-dom';

// Import Context Providers and hooks
import {AuthProvider} from "./context/AuthProvider.jsx";
import {useAuth} from './context/AuthContext.jsx';
import NextTodo from './components/NextTodo.jsx'; // Ensure path is correct
import UserDashboardPage from './features/user-dashboard/UserDashboardPage';
import {lazy, Suspense} from "react";
import RiskyPage from "./pages/RiskyPage.jsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const ComplexQueryPage = lazy(() => import('./features/blog/ComplexQueryPage'));
const StockWatchlistPage = lazy(() => import('./pages/StockWatchlistPage'));


const queryClient = new QueryClient();

const HomePage = () => (
    <div>
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">React Learning Hub</h1>
        <p className="text-lg text-gray-300">
            Welcome! Use the menu on the left to navigate between the different complex examples
            we've built. Each one demonstrates a different set of core React concepts.
        </p>
    </div>
);

// Main App component now sets up the providers
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <AppLayout/>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
}

// The Layout component consumes the context and contains the UI structure
function AppLayout() {
    const {user, loading, login, logout} = useAuth(); // Consume the auth context

    const navigate = useNavigate();

    const getNavLinkClass = ({isActive}) => {
        const baseClasses = "block w-full text-left px-4 py-2 rounded-md transition-colors duration-200";
        return isActive
            ? `${baseClasses} bg-cyan-500 text-white font-semibold`
            : `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    };

    const handleLogout = () => {
        logout(() => navigate('/'));
    };

    const LoadingFallback = () => (
        <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-400">Loading Page...</p>
        </div>
    );

    return (
        <div className="h-[95vh] flex font-sans bg-gray-900 text-white overflow-hidden">
            {/* --- Sidebar Navigation --- */}
            <nav className="w-64 bg-gray-800 p-4 shrink-0 flex flex-col">
                <div>
                    <h2 className="text-xl font-bold text-white mb-6">Examples Menu</h2>
                    <ul className="space-y-2">
                        <li><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/todo" className={getNavLinkClass}>1. To-Do List</NavLink></li>
                        <li><NavLink to="/stock-watchlist" className={getNavLinkClass}>2. Stock Watchlist</NavLink></li>
                        <li><NavLink to="/user-dashboard" className={getNavLinkClass}>3. User Dashboard</NavLink></li>
                        <li><NavLink to="/risky-page" className={getNavLinkClass}>4. Error Boundary</NavLink></li>
                        <li><NavLink to="/blog" className={getNavLinkClass}>5. Blog</NavLink></li>
                    </ul>
                </div>

                {/* --- Auth Status UI in Sidebar --- */}
                <div className="mt-auto border-t border-gray-700 pt-4">
                    {loading ? (
                        <p className="text-gray-400 text-center">Authenticating...</p>
                    ) : user ? (
                        <div>
                            <p className="text-sm text-gray-300">Welcome,</p>
                            <p className="font-bold text-white truncate">{user.name}</p>
                            <button onClick={handleLogout}
                                    className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition-colors">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-center text-gray-300">You are not logged in.</p>
                            <button onClick={() => login('Alice')}
                                    className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg transition-colors">
                                Login as Alice
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* --- Main Content Area --- */}
            <main className="flex-grow p-8 overflow-y-auto">
                <Suspense fallback={<LoadingFallback/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/todo" element={<NextTodo/>}/>
                        <Route path="/stock-watchlist" element={<StockWatchlistPage/>}/>
                        <Route path="/user-dashboard" element={<UserDashboardPage/>}/>
                        <Route path="/risky-page" element={<RiskyPage/>}/>
                        <Route path="/blog" element={<ComplexQueryPage/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App;