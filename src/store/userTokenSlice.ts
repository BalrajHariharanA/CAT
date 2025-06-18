import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {Token, UserTokenListState} from './../types';

const initialState: UserTokenListState = {
   userTokens: [],
   loading: 'pending',
   error: null,
}

export const fetchUserTokenBalance = createAsyncThunk('user/fetchUserTokenBalance', async ({address, chainName}:{address: string, chainName: string}, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_FRONT_API_ENDPOINT}/${chainName}/address/${address}/balances`);
    return response.data.data.token as Token[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const userTokenSliceSlice = createSlice({
    name: "userTokeBalance",
    initialState,
    reducers: {
    },
      extraReducers: (builder) => {
    builder
      .addCase(fetchUserTokenBalance.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserTokenBalance.fulfilled, (state, action) => {
        state.loading = 'success';
        state.userTokens = action.payload;
      })
      .addCase(fetchUserTokenBalance.rejected, (state, action) => {
        state.loading = 'failure';
        state.error = action.payload as string;
      });
  },
});

export default userTokenSliceSlice.reducer;