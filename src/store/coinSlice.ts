import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {Coin, CoinState} from './../types'

const initialState: CoinState = {
   coins: [],
   loading: 'pending',
   error: null,
}

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_COINGECKO_API_ENDPOINT}/coins/markets?vs_currency=usd`, {
        headers: {
          'x-cg-pro-api-key' : import.meta.env.VITE_COINGECKO_API_KEY,
          'Accept': 'application/json',
        },
    });
    return response.data as Coin[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const coinSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {
    },
      extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = 'success';
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = 'failure';
        state.error = action.payload as string;
      });
  },
});

export default coinSlice.reducer;