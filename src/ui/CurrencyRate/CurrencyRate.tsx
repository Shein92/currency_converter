import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrenciesDataType, getCurrencyAndValue, setFavoriteCurrencies } from '../../bll/currencyRateReducer';
import { AppRootStateType } from '../../bll/store';

const CurrencyRate = React.memo(() => {

	const baseCurrency = useSelector<AppRootStateType, string>(b => b.basicCurrency.baseCurrency);
	const currencyData = useSelector<AppRootStateType, Array<CurrenciesDataType>>(d => d.currency.currnciesData);
	const favoriteCurrencyData = useSelector<AppRootStateType, Array<CurrenciesDataType>>(d => d.currency.favoriteCurrenciesData);
	const dispatch = useDispatch();
	// console.log(currencyData);

	useEffect(() => {
		dispatch(getCurrencyAndValue(baseCurrency))
	}, [baseCurrency, dispatch]);

	const onFavoriteBtnClick = (index: number) => {
		dispatch(setFavoriteCurrencies(index))
	}

	return (
		<div>
			{favoriteCurrencyData
				? <div>{favoriteCurrencyData.map((cur, index) => {
					return (
						<div key={index}><span>{cur.currency}</span> - <span>{cur.value}</span></div>
					)
				})}</div>
				: null
			}
			{currencyData.map((cur, index) => {
				return (
					<div key={index}><span>{cur.currency}</span> - <span>{cur.value}</span> <button onClick={() => onFavoriteBtnClick(index)}>Favorite</button></div>
				)
			})}
		</div>
	)
})

export default CurrencyRate;