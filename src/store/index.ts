import {configureStore} from '@reduxjs/toolkit';
import coinReducer from "./coinSlice"
import priceChartReducer from './priceChartSlice';
import userTokenBalanceReducer from './userTokenSlice'

export const store = configureStore({
    reducer :{
        coins: coinReducer,
        priceChart: priceChartReducer,
        userTokeBalance: userTokenBalanceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;