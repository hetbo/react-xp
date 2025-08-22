import { useMemo } from 'react';
import { useStockData } from '../hooks/useStockData';
import AddStockForm from '../components/Stock/AddStockForm.jsx';
import PortfolioSummary from '../components/Stock/PortfolioSummary.jsx';
import StockList from '../components/Stock/StockList.jsx';

function StockWatchlistPage() {
    // Destructure the new refreshData function from our hook
    const { watchlist, stockData, loading, error, addSymbol, removeSymbol, refreshData } = useStockData();

    const portfolioSummary = useMemo(() => {
        // ... (this calculation remains the same)
        let totalValue = 0;
        let topMover = null;

        watchlist.forEach(symbol => {
            const data = stockData[symbol];
            if (data) {
                totalValue += parseFloat(data.price);
                if (!topMover || parseFloat(data.changePercent) > parseFloat(topMover.changePercent)) {
                    topMover = data;
                }
            }
        });

        return { totalValue: totalValue.toFixed(2), topMover };
    }, [stockData, watchlist]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center p-4 font-sans">
            <div className="w-full max-w-2xl">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-cyan-400">My Stock Watchlist</h1>
                        {/* --- REFRESH BUTTON ADDED HERE --- */}
                        <button
                            onClick={refreshData}
                            disabled={loading}
                            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Refreshing...' : 'Refresh Prices'}
                        </button>
                    </div>

                    <AddStockForm onAddSymbol={addSymbol} />

                    {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                    <PortfolioSummary summary={portfolioSummary} />

                    <StockList
                        watchlist={watchlist}
                        stockData={stockData}
                        onRemove={removeSymbol}
                        // Pass loading state down to show a general loading indicator
                        loading={loading && watchlist.length > 0 && Object.keys(stockData).length === 0}
                    />
                </div>
            </div>
        </div>
    );
}

export default StockWatchlistPage;