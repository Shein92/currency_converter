import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { getCurrencies } from './bll/basicCurrencyReducer';
import { getFullListOfCurrencies } from './bll/converterReducer';
import BaseCurrency from './ui/Header/Header';
import Body from './ui/Body/Body';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrencies());
		dispatch(getFullListOfCurrencies())
	}, [])

	return (
		<div className="App">
			<BrowserRouter>
				<BaseCurrency />
				<Body />
			</BrowserRouter>
		</div>
	);
}

export default App;
