import { currency } from './../api/API';
import { Dispatch } from 'redux';

const initialState: CurrencyRateType = {
	currnciesData: [{
		currency: '',
		value: ''
	}],
	favoriteCurrenciesData: []
}

export const currenctRateReducer = (state: CurrencyRateType = initialState, action: ActionsType) => {
	switch(action.type) {
		case 'SET-CURRENCY-AND-VALUE': {
			return {...state, currnciesData: [...action.data]}
		}
		case 'SET-FAVORITE-CURRENCIES': {
			return { ...state, favoriteCurrenciesData: [...state.favoriteCurrenciesData, state.currnciesData[action.index]]}
		}
		default: {
			return state
		}
	}
}

//Action Creators
const setCurrencyAndValue = (data: Array<CurrenciesDataType>) => {
	return {type: 'SET-CURRENCY-AND-VALUE', data} as const
}

export const setFavoriteCurrencies = (index: number) => {
	return {type: 'SET-FAVORITE-CURRENCIES', index} as const
}

//Thunk
export const getCurrencyAndValue = (baseCurrency: string) => {
	return (dispatch: Dispatch) => {
		currency.getCurrenciesAndValue(baseCurrency)
			.then(res => {
				const a = res.data.rates;
				const data = [];

				for (let key in a) {
					const newObj = {
						currency: key,
						value: a[key]
					}
					data.push(newObj)
				}
				dispatch(setCurrencyAndValue(data))
				// console.log(data)
			})
	}
}

//Types
type CurrencyRateType = {
	currnciesData: Array<CurrenciesDataType>,
	favoriteCurrenciesData: Array<CurrenciesDataType>
}

export type CurrenciesDataType = {
	currency: string,
	value: string | number
}

type ActionsType = ReturnType<typeof setCurrencyAndValue>
| ReturnType<typeof setFavoriteCurrencies>