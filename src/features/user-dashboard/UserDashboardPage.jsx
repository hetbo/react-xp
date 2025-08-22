import { useState, useMemo, useCallback } from 'react';
import { useUsers } from './hooks/useUsers.js';
import SearchBar from './components/SearchBar.jsx';
import UserItem from './components/UserItem.jsx';

function UserDashboardPage() {
    console.log('%c[UserDashboardPage] Re-rendering...', 'color: blue; font-weight: bold;');

    // State and logic from our custom hook
    const { users, removeUser, promoteUser } = useUsers();

    // State that is local to THIS component. Changing it will cause this page to re-render.
    const [searchTerm, setSearchTerm] = useState('');

    // useMemo to filter users. This calculation only re-runs if `users` or `searchTerm` change.
    const filteredUsers = useMemo(() => {
        console.log('%c[UserDashboardPage] Filtering users (useMemo)...', 'color: purple;');
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // useCallback ensures that the functions passed to SearchBar and UserItem
    // do not get re-created on every render, which is critical for React.memo to work.
    const handleRemoveUser = useCallback((userId) => {
        removeUser(userId);
    }, [removeUser]);

    const handlePromoteUser = useCallback((userId) => {
        promoteUser(userId);
    }, [promoteUser]);

    const handleSearch = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div className="bg-gray-900 text-white flex justify-center p-4 font-sans">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-cyan-400">User Dashboard</h1>

                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />

                <div className="space-y-4">
                    {filteredUsers.map(user => (
                        <UserItem
                            key={user.id}
                            user={user}
                            onRemove={handleRemoveUser}
                            onPromote={handlePromoteUser}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDashboardPage;