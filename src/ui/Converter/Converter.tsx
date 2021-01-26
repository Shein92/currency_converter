import React, { ChangeEvent, useEffect, useState } from 'react';
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
	}, [firstCur, secondCur])

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
	}

	const onFirstSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFirstCur(event.currentTarget.value);
	}
	const onSecondSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSecondCur(event.currentTarget.value);
	}
	const onBtnClickChangeValue = () => {
		dispatch(setNewTotalValue(+value))
	}

	return (
		<div className={style.converter}>
			<div>
				<input type="text" value={value} onChange={onInputChange} />
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
				<button onClick={onBtnClickChangeValue}>LET'S GO</button>
				<span>{exchangeValue}</span>
			</div>
		</div>
	)
});

export default Converter;