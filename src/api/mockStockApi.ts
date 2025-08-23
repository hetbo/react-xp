// 1. Define the shape of the object this function returns
type StockData = {
    symbol: string;
    price: string;
    changePercent: string;
};

// 2. Apply types to the function's arguments and its return value
export const mockFetchStockData = async (symbol: string): Promise<StockData> => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));

    if (symbol.toUpperCase() === 'ERR') {
        throw new Error('Invalid stock symbol provided.');
    }

    return {
        symbol: symbol.toUpperCase(),
        price: (Math.random() * 2000 + 50).toFixed(2),
        changePercent: (Math.random() * 10 - 5).toFixed(2),
    };
};