import React, { ChangeEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DataCurrencyType, setBaseCurrency } from '../../bll/basicCurrencyReducer';
import { AppRootStateType } from '../../bll/store';
import style from './BaseCurrency.module.css'

const BaseCurrency = React.memo(() => {

	const [selectedCurr, setSelectedCurr] = useState('EUR');
	const dispatch = useDispatch();

	const nameOfCurrency = useSelector<AppRootStateType, Array<DataCurrencyType>>(name => name.basicCurrency.currencyData);

	const onCurrencyChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setBaseCurrency(event.currentTarget.value));
		setSelectedCurr(event.currentTarget.value);
	}, [dispatch])

	return (
		<div className={style.header}>
			<div className={style.container}>
				<span>Choose you base currency: </span> <select onChange={onCurrencyChange} value={selectedCurr}>
					{nameOfCurrency.map((op: DataCurrencyType, index) => {
						return <option key={index}>{`${op.currency}`}</option>
					})}
				</select>
			</div>
		</div>
	)
});

export default BaseCurrency;