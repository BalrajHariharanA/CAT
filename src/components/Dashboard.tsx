import React, {useState, useEffect} from 'react'
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import DropDown from './DropDown';
import PriceChart from './PriceChart';
import UserTokenList from './UserTokenList'
import {Coin} from './../types';
import { fetchCoins } from './../store/coinSlice';
import { useAppSelector, useAppDispatch } from './../hooks';
import {defaultChartDuration} from './../constants';

const  Dashboard: React.FC = () => {
  const [token, setToken] = useState<Coin | null>(null);
  const [chartDuration, setChartDuration] = useState<number>(defaultChartDuration)
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.coins);
  const { address, isConnected } = useAppKitAccount();
  const {chainId} = useAppKitNetwork()
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

   useEffect(() => {
    setToken(coins[0])
  }, [coins]);

  const onSelect = (coin: Coin) =>  {
     setToken(coin);
     setChartDuration(defaultChartDuration);
  }
  const onDurationSelect = (duration: number) =>  {
     setChartDuration(duration);
  }
  const getPriceChange = (change: number | undefined) =>{
    if(change && change > 0){
      return <div className='flex items-center text-green-400 font-bold'><ChevronUpIcon aria-hidden="true" className="-mr-1 size-5 font-bold"/>{(change).toFixed(2)}%</div>
    } else {
      return <div className='flex items-center text-red-600 font-bold'><ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 font-bold"/>{change && (change * -1).toFixed(2)}%</div>
    }
  }
  return (
      <div className="w-full pt-10">
        {
          isConnected && address && chainId && <UserTokenList address={address} chainId={chainId}/>
        }
        {!isConnected && <>
        <div className='flex justify-end'>
          {/* <h1 className="text-2xl font-semibold text-blue-600 mb-4">Track Your Asset</h1> */}
          <DropDown coins ={coins} onSelect={onSelect} selectedToken={token}/>
        </div>
        <div className="flex flex-row">
            <div className='pt-4 pb-4 pr-4 bg-white basis-1/3 border-r-1 border-gray-200'>
              <div className='flex items-center'>
                <div className='w-5 h-5 mr-2'><img className="h-auto max-w-full" src={token?.image} alt={token?.name}></img></div>
                <h2 className='text-grey-500 font-bold text-2xl mr-2'>{token?.name}</h2>
                <span className='text-gray-400 pt-1 text-sm'>{token?.symbol} Price</span>
              </div>
              <div className='flex items-center mt-2'>
                <h1 className="text-xl font-bold text-grey-500 mb-4">${(token?.current_price)}</h1>
                {getPriceChange(token?.price_change_percentage_24h)}
              </div>
              <div className='flex justify-between pb-2 pt-2 border-b border-gray-200'>
                <span className='text-gray-400 text-sm'>Market cap rank</span>
                <span className='font-semibold'>#{token?.market_cap_rank}</span>
              </div>
              <div className='flex justify-between pb-2 pt-2 border-b border-gray-200'>
                <span className='text-gray-400 text-sm'>Market Cap</span>
                <span className='font-semibold'>${token?.market_cap}</span>
              </div>
              <div className='flex justify-between pb-2 pt-2 border-b border-gray-200'>
                <span className='text-gray-400 text-sm'>Fully Diluted Valuation</span>
                <span className='font-semibold'>${token?.fully_diluted_valuation}</span>
              </div>
              <div className='flex justify-between pb-2 pt-2 border-b border-gray-200'>
                <span className='text-gray-400 text-sm'>Circulating Supply</span>
                <span className='font-semibold'>{token?.circulating_supply}</span>
              </div>
              <div className='flex justify-between pb-2 pt-2 border-b border-gray-200'>
                <span className='text-gray-400 text-sm'>Total Supply</span>
                <span className='font-semibold'>{token?.total_supply}</span>
              </div>
              <div className='flex justify-between pb-2 pt-2 border-b border-gray-200'>
                <span className='text-gray-400 text-sm'>Max Supply</span>
                <span className='font-semibold'>{token?.max_supply ? token?.max_supply : 'Infinity'}</span>
              </div>
            </div>
            <div className='pt-4 pb-4 pl-4 bg-white basis-2/3'>
            {token?.id && <PriceChart selectedToken={token?.id} chartDuration={chartDuration} onDurationSelect={onDurationSelect} chain={""} tokenAddress={""} isCoingecko={true}/>}
            </div>
        </div>
        </>
}
        
        {loading === 'pending' && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
  )
}

export default Dashboard