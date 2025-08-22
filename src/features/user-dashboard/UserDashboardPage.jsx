import { useState, useMemo, useCallback } from 'react';
import { useUsers } from './hooks/useUsers';
import { useAuth } from '../../context/AuthContext.jsx'; // 1. Import the auth hook
import SearchBar from './components/SearchBar.jsx';
import UserItem from './components/UserItem.jsx';

function UserDashboardPage() {
    console.log('%c[UserDashboardPage] Re-rendering...', 'color: blue; font-weight: bold;');

    // 2. Consume the authentication context
    const { user, loading: authLoading } = useAuth();
    const { users, removeUser, promoteUser } = useUsers();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        console.log('%c[UserDashboardPage] Filtering users (useMemo)...', 'color: purple;');
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // These useCallback hooks will now work correctly because removeUser and
    // promoteUser (from the updated useUsers hook) are stable.
    const handleRemoveUser = useCallback((userId) => {
        removeUser(userId);
    }, [removeUser]);

    const handlePromoteUser = useCallback((userId) => {
        promoteUser(userId);
    }, [promoteUser]);

    const handleSearch = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    // 3. Add loading and protected route logic
    if (authLoading) {
        return <h2 className="text-2xl text-center">Verifying access...</h2>;
    }

    if (!user) {
        return (
            <div className="text-center bg-gray-800 p-8 rounded-lg">
                <h2 className="text-2xl text-red-400">Access Denied</h2>
                <p className="mt-2">You must be logged in to view the User Dashboard.</p>
            </div>
        );
    }

    // 4. Cleaned-up JSX with a personalized welcome and empty state
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-cyan-400">User Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user.name}!</p>
                </div>

                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />

                <div className="space-y-4">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(u => (
                            <UserItem
                                key={u.id}
                                user={u}
                                onRemove={handleRemoveUser}
                                onPromote={handlePromoteUser}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            No users found matching your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboardPage;