import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExhangeRate, ListOfCurrenciesType, setNewTotalValue } from '../../bll/converterReducer';
import { AppRootStateType } from '../../bll/store';
import style from './Converter.module.css';

const Converter = React.memo(() => {

	const [value, setValue] = useState('');
	const [firstCur, setFirstCur] = useState('EUR');
	const [secondCur, setSecondCur] = useState('USD');

	const dispatch = useDispatch();

	const fullListOfCurrencies = useSelector<AppRootStateType, Array<ListOfCurrenciesType>>(curr => curr.converter.listOfCurrencies);
	const exchangeValue = useSelector<AppRootStateType, number>(val => val.converter.totalValue)

	useEffect(() => {
		dispatch(getExhangeRate(firstCur, secondCur));
		dispatch(setNewTotalValue(0));
	}, [firstCur, secondCur])

	const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
	}, [])

	const onFirstSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		setFirstCur(event.currentTarget.value);
	},[])
	const onSecondSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		setSecondCur(event.currentTarget.value);
	},[])
	const onBtnClickChangeValue = useCallback(() => {
		dispatch(setNewTotalValue(+value))
	},[dispatch, value])

	return (
		<div className={style.converter}>
			<div className={style.converterWrap}>
				<h1>CURRENCY CONVERTER:</h1>
				<div className={style.converterLog}>
					<input type="number" value={value} onChange={onInputChange} placeholder={'Type a number'} />
					<select value={firstCur} onChange={onFirstSelectChange}>
						{fullListOfCurrencies.map((curr, index) => {
							return (
								<option key={index}>{`${curr.currencyName}`}</option>
							)
						})}
					</select>
					<select value={secondCur} onChange={onSecondSelectChange}>
						{fullListOfCurrencies.map((curr, index) => {
							return (
								<option key={index}>{`${curr.currencyName}`}</option>
							)
						})}</select>
					<button className={style.btn} onClick={onBtnClickChangeValue}>LET'S GO</button>
				</div>
				<span className={style.totalSum}>Total: {exchangeValue} {firstCur}</span>
			</div>
		</div>
	)
});

export default Converter;