import {useState, useEffect, useMemo} from 'react'
import { useAppSelector, useAppDispatch } from './../hooks';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import { fetchUserTokenBalance } from '../store/userTokenSlice';
import {weiToEther} from './../utils'
import PriceChart from './PriceChart';
import {ChainMap} from './../constants';
import { IUserTokenList, Token } from '../types';

const UserTokenList = ({address, chainId}: IUserTokenList) => {
   const defaultChartDuration: number = 7;
    const [chartDuration, setChartDuration] = useState<number>(defaultChartDuration)
    const [selectedToken, setSelectedToken] = useState({} as Token)
    const getChainName = (chainId: any) =>{
      return ChainMap[chainId]
    }
    const chainName: string = getChainName(chainId);
    const dispatch = useAppDispatch();
    const { userTokens, loading, error } = useAppSelector((state) => state.userTokeBalance);
    const updatedTokens = userTokens.filter(t => parseFloat(t.quote_rate)>0)
    useEffect(() => {
     setChartDuration(defaultChartDuration);
     setSelectedToken({} as Token)
    }, [chainId]);
    useEffect(() => {
        dispatch(fetchUserTokenBalance({address, chainName}));
    }, [dispatch, address, chainId]);
    useEffect(() => {
        setSelectedToken(userTokens[0])
    }, [userTokens]);
    const onTokenSelect = (token: Token) =>{
      setSelectedToken(token)
    }
    const onDurationSelect = (duration: number) =>  {
      setChartDuration(duration);
    }
    const totalWorth: number = useMemo(()=>{
      const total = updatedTokens.reduce((acc, curr)=>{
        acc += parseFloat(curr?.quote);
        return acc
      },0)
      return total;
    }, [userTokens])
  return (
    <div className='flex flex-col'>
      <div className='border-b-gray-200 border-b pb-4'>
         <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-sm sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <CursorArrowRaysIcon className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">Total Worth</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-2">
              <p className="text-2xl font-semibold text-gray-900">{`$${totalWorth.toFixed(6)}`}</p>
            </dd>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-sm sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <CursorArrowRaysIcon className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">Total tokens</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-2">
              <p className="text-2xl font-semibold text-gray-900">{updatedTokens?.length}</p>
            </dd>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-sm sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <CursorArrowRaysIcon className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">Chain connected</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-2">
              <p className="text-2xl font-semibold text-gray-900">{`${chainName.toUpperCase()} - ${chainId}`}</p>
            </dd>
          </div>
      </dl>
    </div>
    <div className='flex flex-row'>
    <div className='pt-4 pb-4 pr-6 bg-white basis-1/3 border-r-1 border-gray-200 h-[calc(100vh-250px)] overflow-scroll max-h-[calc(100vh-250px)]'>
    { loading === "pending" && <div>Loading....</div>}
      <ul role="list" className="divide-y divide-gray-100 pb-10">
        { loading === "success" && updatedTokens.map((token) => (
          <li key={token.contract_address} className={selectedToken?.contract_address === token?.contract_address ? "flex flex-col justify-center gap-x-6 border border-gray-300 mb-2 rounded-sm  bg-gray-100 cursor-pointer" :"flex flex-col justify-center gap-x-6 border border-gray-300 mb-2 rounded-sm hover:bg-gray-50 cursor-pointer"} onClick={()=>onTokenSelect(token)}>
            <div className="flex min-w-0 gap-x-4 p-4">
              <img alt="" src={token.logo_url} className="size-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-bold text-gray-900">{token.contract_ticker_symbol}</p>
                <p className="mt-1 truncate font-semibold text-sm text-gray-700">{weiToEther(token?.balance)}</p>
                <p className="mt-1 truncate font-semibold text-xs/5 text-gray-700">${parseFloat(token.quote).toFixed(3)}</p>
              </div>
            </div>
              <div className='bg-gray-200 border-t-gray-300 overflow-hidden pl-4 pr-4 pt-1 pb-1 font-bold'>
                {`1 ${token.contract_ticker_symbol} : $${token.quote_rate}`}
              </div>
          </li>
        ))}
      </ul>
      </div>
      <div className='pt-4 pb-4 pl-4 bg-white basis-2/3'>
          {selectedToken?.contract_address  && <PriceChart selectedToken={""} chartDuration={chartDuration} onDurationSelect={onDurationSelect} chain={chainName} tokenAddress={selectedToken?.contract_address} isCoingecko={false}/>}
          {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      </div>
    </div>
  )
}

export default UserTokenList