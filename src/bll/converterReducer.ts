import { currency } from './../api/API';
import { Dispatch } from 'redux';

const initialState: CurrencyConverterType = {
	listOfCurrencies: [],
	exchangeRate: 0,
	totalValue: 0
}

export const converterReducer = (state: CurrencyConverterType = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'SET-FULL-LIST-OF-CURRENCIES': {
			return { ...state, listOfCurrencies: [...action.data] }
		}
		case 'SET-EXCHANGE-RATE': {
			return { ...state, exchangeRate: action.rate }
		}
		case 'SET-TOTAL-VALUE': {
			let newValue = (state.exchangeRate * action.num).toFixed(2);
			return { ...state, totalValue: Number(newValue) }
		}
		default: {
			return state
		}
	}
};

//Action Creators
export const setListOfCurrencies = (data: Array<ListOfCurrenciesType>) => {
	return { type: 'SET-FULL-LIST-OF-CURRENCIES', data } as const
}

const setExchangeRate = (rate: number) => {
	return { type: 'SET-EXCHANGE-RATE', rate } as const
}

export const setNewTotalValue = (num: number) => {
	return { type: 'SET-TOTAL-VALUE', num } as const
}

//THUNK
export const getExhangeRate = (curencyOne: string, currencyTwo: string) => {
	return (dispatch: Dispatch) => {
		currency.getExhangeRate(curencyOne, currencyTwo)
			.then(res => {
				let rate;
				for (let key in res.data) {
					rate = res.data[key];
				}
				dispatch(setExchangeRate(rate));
				console.log(rate);
			})
	}
}

export const getFullListOfCurrencies = () => {
	return (dispatch: Dispatch) => {
		currency.getFullListOfCurrencies()
			.then(res => {
				let data = [];

				for (let key in res.data.results) {
					let newObj = {
						currencyName: key,
					}
					data.push(newObj)
				};

				dispatch(setListOfCurrencies(data));
			})
	}
}

//TYPES
type CurrencyConverterType = {
	listOfCurrencies: Array<ListOfCurrenciesType>,
	exchangeRate: number,
	totalValue: number

};
export type ListOfCurrenciesType = {
	currencyName: string
}

type ActionsType = ReturnType<typeof setListOfCurrencies>
	| ReturnType<typeof setExchangeRate>
	| ReturnType<typeof setNewTotalValue>;