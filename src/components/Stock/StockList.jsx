import StockItem from './StockItem';

function StockList({ watchlist, stockData, onRemove, loading }) {
    if (loading && watchlist.length > 0) {
        return <p className="text-center">Loading fresh data...</p>;
    }

    if (watchlist.length === 0) {
        return <p className="text-center text-gray-400">Your watchlist is empty. Add a stock symbol to get started.</p>;
    }

    return (
        <div className="space-y-3">
            {watchlist.map(symbol => (
                <StockItem
                    key={symbol}
                    symbol={symbol}
                    data={stockData[symbol]}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default StockList;