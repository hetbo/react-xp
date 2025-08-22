function StockItem({ symbol, data, onRemove }) {
    const change = data ? parseFloat(data.changePercent) : 0;

    return (
        <div className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
            <div>
                <p className="text-xl font-bold">{symbol}</p>
                <p className="text-gray-400">Price</p>
            </div>
            {data ? (
                <div className="text-right">
                    <p className="text-xl font-mono">${data.price}</p>
                    <p className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {change >= 0 ? '+' : ''}{data.changePercent}%
                    </p>
                </div>
            ) : (
                <p className="text-gray-500">Fetching...</p>
            )}
            <button onClick={() => onRemove(symbol)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg ml-4">
                Remove
            </button>
        </div>
    );
}

export default StockItem;