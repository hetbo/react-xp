import { useState, useEffect, useCallback } from 'react'; // Import useCallback

const initialUsers = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' },
    { id: 4, name: 'Diana', role: 'Developer' },
];

export function useUsers() {
    const [users, setUsers] = useState(initialUsers);

    useEffect(() => {
        console.log('%c[useUsers Hook] Core user data has been updated.', 'color: green; font-weight: bold;');
    }, [users]);

    // By wrapping these in useCallback, we guarantee they are the same function
    // instance on every render, making them stable dependencies.
    const removeUser = useCallback((userId) => {
        setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    }, []); // Empty dependency array because it uses the setter function which is stable

    const promoteUser = useCallback((userId) => {
        setUsers(currentUsers =>
            currentUsers.map(user =>
                user.id === userId ? { ...user, role: `Senior ${user.role}` } : user
            )
        );
    }, []);

    // Return the stable functions
    return { users, removeUser, promoteUser };
}