import React, { useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useAppSelector, useAppDispatch } from './../hooks';
import { fetchPrices } from '../store/priceChartSlice';
import {timerOptions} from './../constants';
import { IToken } from '../types';

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const PriceChart: React.FC<IToken> = ({selectedToken, chartDuration, onDurationSelect, chain, tokenAddress, isCoingecko}) => {
  const dispatch = useAppDispatch();
  const { prices, loading, error } = useAppSelector((state) => state.priceChart);
  const dps =  prices.map(p => {
     var d = new Date(p[0]);
    return {x: d, y: p[1]}
  })
  const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: ""
			},
			axisX:{
				valueFormatString: "DD MMM",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "",
				valueFormatString: "$##0.00",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e: any) {
						return "$" + CanvasJS.formatNumber(e.value, "##0.00");
					}
				}
			},
			data: [{
				type: "area",
				xValueFormatString: "DD MMM",
				yValueFormatString: "$##0.00",
        dataPoints: dps,
			}]
		}
  useEffect(() => {
       dispatch(fetchPrices({isCoingecko, selectedToken, chartDuration, chain, tokenAddress}));
  }, [dispatch, selectedToken, chartDuration, chain, tokenAddress]);
    return(
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full mb-8">
            <div className='flex justify-between'>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price Chart</h2>
              <fieldset aria-label="Choose a memory option">
                <div className="mt-2 grid grid-cols-4 gap-3">
                  {timerOptions.map((option) => (
                    <label
                      key={option.duration}
                      aria-label={option.label}
                      className="group relative flex items-center text-xs justify-center rounded-md border border-gray-300 bg-white p-1 has-checked:border-gray-600 has-checked:bg-gray-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gray-600 has-disabled:opacity-25"
                    >
                      <input
                        checked={option.duration === chartDuration}
                        value={chartDuration}
                        name="option"
                        type="radio"
                        onChange={()=>{onDurationSelect(option.duration)}}
                        className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                      />
                      <span className="text-xs font-medium uppercase group-has-checked:text-white">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {/* <ChartTimer onSelect={onSelect} chartDuration={chartDuration}/> */}
            </div>
            {loading === 'pending' && 
                   <div className='h-100 w-100'><div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent"></div></div>
            }
            {error && <p className="text-red-500">Error: {error}</p>}
            {loading === 'success' && prices?.length > 0 && (
              <div className="bg-white p-4 rounded shadow">
                <CanvasJSChart options = {options} />
              </div>
            )}
            {loading === 'success' && prices?.length === 0 && (
              <p className="text-gray-600">No data for chart.</p>
            )}
          </div>
        </div>
    )
}


export default React.memo(PriceChart);



// 1749668630896
// 1750185025436