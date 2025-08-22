import React from 'react';

// This component is memoized to prevent re-rendering when the parent re-renders
// for reasons unrelated to the search term (like the user list changing).
const SearchBar = React.memo(function SearchBar({ searchTerm, onSearchChange }) {

    return (
        <input
            type="text"
            placeholder="Search for a user..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg p-3 mb-6 focus:outline-none focus:border-cyan-500"
        />
    );
});

export default SearchBar;