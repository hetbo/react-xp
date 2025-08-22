export const mockFetchStockData = async (symbol) => {
    console.log(`Fetching data for ${symbol}...`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));

    // Simulate a potential error for a specific symbol
    if (symbol.toUpperCase() === 'ERR') {
        throw new Error('Invalid stock symbol provided.');
    }

    // Generate mock data
    return {
        symbol: symbol.toUpperCase(),
        price: (Math.random() * 2000 + 50).toFixed(2),
        changePercent: (Math.random() * 10 - 5).toFixed(2),
    };
};