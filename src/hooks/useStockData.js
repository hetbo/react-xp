import { useState, useEffect, useCallback } from 'react';
import { mockFetchStockData } from '../api/mockStockApi.js';

export function useStockData() {
    // --- STATE INITIALIZATION FROM LOCALSTORAGE ---
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('stockWatchlist');
        return saved ? JSON.parse(saved) : ['AAPL', 'GOOGL', 'TSLA'];
    });

    // REQUIREMENT #1: stockData is now also loaded from localStorage.
    const [stockData, setStockData] = useState(() => {
        const saved = localStorage.getItem('stockData');
        return saved ? JSON.parse(saved) : {};
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // --- LOCALSTORAGE PERSISTENCE EFFECTS ---
    useEffect(() => {
        localStorage.setItem('stockWatchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    useEffect(() => {
        // Only save if there's actual data to prevent overwriting with an empty object.
        if (Object.keys(stockData).length > 0) {
            localStorage.setItem('stockData', JSON.stringify(stockData));
        }
    }, [stockData]);


    // --- CORE FETCHING LOGIC (EXTRACTED) ---
    // We use useCallback here to memoize this function. It's a good practice
    // for functions used in effects or passed down as props.
    const fetchPrices = useCallback(async (symbolsToFetch) => {
        if (symbolsToFetch.length === 0) return;

        setLoading(true);
        setError(null);

        const promises = symbolsToFetch.map(symbol => mockFetchStockData(symbol));
        const results = await Promise.allSettled(promises);

        const newDataMap = {};
        const failedSymbols = [];

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                newDataMap[result.value.symbol] = result.value;
            } else {
                failedSymbols.push(symbolsToFetch[index]);
            }
        });

        // Merge new data with existing data.
        setStockData(prevData => ({ ...prevData, ...newDataMap }));

        if (failedSymbols.length > 0) {
            setError(`Could not fetch data for: ${failedSymbols.join(', ')}. Symbol(s) removed.`);
            setWatchlist(prevList => prevList.filter(symbol => !failedSymbols.includes(symbol)));
        }

        setLoading(false);
    }, []); // Empty dependency array as it has no external dependencies


    // --- AUTOMATIC FETCHING FOR NEW SYMBOLS ---
    // REQUIREMENT #2: This effect now only fetches for new items.
    useEffect(() => {
        const symbolsWithoutData = watchlist.filter(symbol => !stockData[symbol]);
        fetchPrices(symbolsWithoutData);
    }, [watchlist, stockData, fetchPrices]);


    // --- HANDLER FUNCTIONS ---
    const addSymbol = (symbolToAdd) => {
        symbolToAdd = symbolToAdd.toUpperCase().trim();
        if (!symbolToAdd || watchlist.includes(symbolToAdd)) return;
        setError(null);
        setWatchlist([...watchlist, symbolToAdd]);
    };

    const removeSymbol = (symbolToRemove) => {
        // Remove from watchlist
        setWatchlist(prevList => prevList.filter(symbol => symbol !== symbolToRemove));
        // Remove from stockData to keep it clean
        setStockData(prevData => {
            const newData = { ...prevData };
            delete newData[symbolToRemove];
            return newData;
        });
    };

    // REQUIREMENT #3: Manual refresh function.
    const refreshData = () => {
        fetchPrices(watchlist);
    };

    // The hook returns everything the UI needs, including the new refresh function.
    return { watchlist, stockData, loading, error, addSymbol, removeSymbol, refreshData };
}