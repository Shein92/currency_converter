import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrenciesDataType, getCurrencyAndValue, setFavoriteCurrencies } from '../../bll/currencyRateReducer';
import { AppRootStateType } from '../../bll/store';
import style from './CurrencyRate.module.css';

const CurrencyRate = React.memo(() => {

	const baseCurrency = useSelector<AppRootStateType, string>(b => b.basicCurrency.baseCurrency);
	const currencyData = useSelector<AppRootStateType, Array<CurrenciesDataType>>(d => d.currency.currnciesData);
	const favoriteCurrencyData = useSelector<AppRootStateType, Array<CurrenciesDataType>>(d => d.currency.favoriteCurrenciesData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrencyAndValue(baseCurrency))
	}, [baseCurrency, dispatch]);

	const onFavoriteBtnClick = useCallback((curr: string) => {
		dispatch(setFavoriteCurrencies(curr))
	}, [dispatch])

	return (
		<div className={style.currecyWrap}>
			{favoriteCurrencyData.length > 0
				? <div className={style.favoriteRates}>
					<div className={style.currencyRates}><span>Favorite currencies:</span><span>Rate</span></div>
					{favoriteCurrencyData.map((cur, index) => {
						return (
							<div key={index} className={style.currencyRates}><span>{cur.currency}</span> <span>{cur.value}</span></div>
						)
					})}</div>
				: null
			}
			<div className={style.currencyRates}><span>Currency:</span><span>Rate</span><span>Add to favorite</span></div>
			{currencyData.map((cur, index) => {
				return (
					<div key={index} className={style.currencyRates}><span>{cur.currency}</span><span>{cur.value}</span> <button onClick={() => onFavoriteBtnClick(cur.currency)}>Favorite</button></div>
				)
			})}
		</div>
	)
})

export default CurrencyRate;