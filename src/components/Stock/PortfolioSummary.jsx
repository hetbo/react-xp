function PortfolioSummary({ summary }) {
    return (
        <div className="bg-gray-700 p-4 rounded-lg mb-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Portfolio Summary</h2>
            <p>Total Value: <span className="font-mono text-green-400">${summary.totalValue}</span></p>
            {summary.topMover ? (
                <p>Top Mover: {summary.topMover.symbol}
                    <span className={parseFloat(summary.topMover.changePercent) >= 0 ? 'text-green-400' : 'text-red-400'}>
             ({summary.topMover.changePercent}%)
           </span>
                </p>
            ) : <p>No stocks to display.</p>}
        </div>
    );
}

export default PortfolioSummary;