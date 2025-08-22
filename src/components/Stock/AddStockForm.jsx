import { useState, useRef, useEffect } from 'react';

function AddStockForm({ onAddSymbol }) {
    const [newSymbol, setNewSymbol] = useState('');
    const symbolInputRef = useRef(null);

    // Autofocus the input field on component mount
    useEffect(() => {
        symbolInputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddSymbol(newSymbol);
        setNewSymbol('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
            <input
                ref={symbolInputRef}
                type="text"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                placeholder="Add stock symbol (e.g., MSFT)"
                className="flex-grow bg-gray-700 text-white border-2 border-gray-600 rounded-lg p-2 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Add
            </button>
        </form>
    );
}

export default AddStockForm;