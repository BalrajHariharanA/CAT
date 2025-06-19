import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import {Token} from '../types'
import { fetchUserTokenBalance } from '../store/userTokenSlice';
import {cacheExpiry} from './../constants'

interface CacheEntry {
  data: Token[];
  timestamp: number;
}

export const useBalanceFetch = ({address, chainName}:{address: string, chainName: string}) => {
  const dispatch = useAppDispatch();
  const { userTokens, loading, error } = useAppSelector((state) => state.userTokeBalance);
  useEffect(() => {
    const cacheKey = `balance_${address}_${chainName}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp }: CacheEntry = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > cacheExpiry;
      if (!isExpired) {
        console.log('timestamp', timestamp)
        dispatch({
          type: 'user/fetchUserTokenBalance/fulfilled',
          payload: data,
        });
        return;
      }
    }
    dispatch(fetchUserTokenBalance({address, chainName})).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        // Save to localStorage
        const cacheEntry: CacheEntry = {
          data: result.payload as Token[],
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
      }
    });
  }, [dispatch]);

  return { userTokens, loading, error };
};