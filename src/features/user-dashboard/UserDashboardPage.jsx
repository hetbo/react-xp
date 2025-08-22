import { useState, useMemo, useCallback } from 'react';
import { useUsers } from './hooks/useUsers';
import { useAuth } from '../../context/AuthContext.jsx'; // 1. Import the auth hook
import SearchBar from './components/SearchBar.jsx';
import UserItem from './components/UserItem.jsx';
import Modal from "../../components/Modal.jsx";

function UserDashboardPage() {

    const { user, loading: authLoading } = useAuth();
    const { users, removeUser, promoteUser } = useUsers();
    const [searchTerm, setSearchTerm] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // These useCallback hooks will now work correctly because removeUser and
    // promoteUser (from the updated useUsers hook) are stable.
    const handleRemoveUser = useCallback((user) => {
        setUserToDelete(user); // Set the user to be deleted, which opens the modal
    }, []);

    const handlePromoteUser = useCallback((userId) => {
        promoteUser(userId);
    }, [promoteUser]);

    const handleSearch = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const cancelDeleteUser = () => {
        setUserToDelete(null); // Close the modal without deleting
    };

    const confirmDeleteUser = () => {
        if (userToDelete) {
            removeUser(userToDelete.id);
            setUserToDelete(null); // Close the modal
        }
    };

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
                            <UserItem key={u.id} user={u} onRemove={() => handleRemoveUser(u)} onPromote={handlePromoteUser} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            No users found matching your search.
                        </p>
                    )}
                </div>
            </div>
            {userToDelete && (
                <Modal onClose={cancelDeleteUser}>
                    <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                    <p className="text-gray-300 mb-6">
                        Are you sure you want to delete the user{' '}
                        <strong className="text-cyan-400">{userToDelete.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={cancelDeleteUser}
                            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDeleteUser}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Delete User
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default UserDashboardPage;