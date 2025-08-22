import { useState, useEffect } from 'react';

const initialUsers = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' },
    { id: 4, name: 'Diana', role: 'Developer' },
];

export function useUsers() {
    const [users, setUsers] = useState(initialUsers);

    // Log whenever the core user data actually changes
    useEffect(() => {
        console.log('%c[useUsers Hook] Core user data has been updated.', 'color: green; font-weight: bold;');
    }, [users]);

    const removeUser = (userId) => {
        setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    };

    const promoteUser = (userId) => {
        setUsers(currentUsers =>
            currentUsers.map(user =>
                user.id === userId ? { ...user, role: `Senior ${user.role}` } : user
            )
        );
    };

    return { users, removeUser, promoteUser };
}