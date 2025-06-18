import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  PriceState } from '../types';

const initialState: PriceState = {
  prices: [],
  loading: 'pending',
  error: null,
};
export const fetchPrices = createAsyncThunk('chart/fetchPrices', async ({ isCoingecko= true, selectedToken, chartDuration = 7, chain = "ethereum", tokenAddress }: { isCoingecko: boolean; selectedToken?: string; chartDuration?: number; chain?: string; tokenAddress?: string },{ rejectWithValue }) => {
  try {
    const url = isCoingecko ? `${import.meta.env.VITE_COINGECKO_API_ENDPOINT}/coins/${selectedToken}/market_chart?vs_currency=usd&days=${chartDuration}` : `${import.meta.env.VITE_FRONT_API_ENDPOINT}/token/info?chain=${chain}&token=${tokenAddress}&range=${chartDuration}`
    const options = isCoingecko ? {
         headers: {
          'x-cg-pro-api-key' : import.meta.env.VITE_COINGECKO_API_KEY,
          'Accept': 'application/json',
        },
    } : {}
    const response = await axios.get(url, options);
    return isCoingecko ? response.data.prices as Array<number[]> : response.data.data.chart.prices as Array<number[]>;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const priceChartSlice = createSlice({
  name: 'priceChart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.loading = 'success';
        state.prices = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = 'failure';
        state.error = action.payload as string;
      });
  },
});

export default priceChartSlice.reducer;