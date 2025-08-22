import React from 'react';

// THE MOST IMPORTANT MEMOIZED COMPONENT.
// It receives functions (`onRemove`, `onPromote`) as props. Without useCallback
// in the parent, these functions would be new on every render, causing this
// component to re-render unnecessarily.
const UserItem = React.memo(function UserItem({ user, onRemove, onPromote }) {
    // This log is our proof. It should ONLY appear when this specific user's
    // data changes, or when the user is first created or finally removed.
    console.log(`%c[UserItem] Re-rendering: ${user.name}`, 'color: red;');

    return (
        <div className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
            <div>
                <p className="text-xl font-bold">{user.name}</p>
                <p className="text-gray-400">{user.role}</p>
            </div>
            <div>
                <button
                    onClick={() => onPromote(user.id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg mr-2 transition-colors"
                >
                    Promote
                </button>
                <button
                    onClick={() => onRemove(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
});

export default UserItem;