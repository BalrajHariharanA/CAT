import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../hooks';
import { fetchCoins } from '../store/coinSlice';

// Cache expiry time (1 hour in milliseconds)
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

interface CacheEntry {
  data: [number, number][];
  timestamp: number;
}

export const usePriceData = (asset: string, timeframe: string) => {
  const dispatch = useAppDispatch();
  const { prices, loading, error } = useAppSelector((state) => state.api);

  useEffect(() => {
    // Generate unique cache key based on asset and timeframe
    const cacheKey = `prices_${asset}_${timeframe}`;

    // Check localStorage for cached data
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp }: CacheEntry = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

      if (!isExpired) {
        // Dispatch cached data to Redux
        dispatch({
          type: 'api/fetchPrices/fulfilled',
          payload: data,
        });
        return;
      }
    }

    // Fetch fresh data if no valid cache
    dispatch(fetchPrices({ asset, timeframe })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        // Save to localStorage
        const cacheEntry: CacheEntry = {
          data: result.payload as [number, number][],
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
      }
    });
  }, [dispatch, asset, timeframe]);

  return { prices, loading, error };
};