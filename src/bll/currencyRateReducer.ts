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
	switch (action.type) {
		case 'SET-CURRENCY-AND-VALUE': {
			let newVal = state.favoriteCurrenciesData.map(item => {
				
				if(state.favoriteCurrenciesData.length > 0) {
					for(let i = 0; i < action.data.length; i++) {
						if (item.currency === action.data[i].currency) {
							item.value = action.data[i].value
						}
					}
				}
				return item;
			});
			
			return { ...state, currnciesData: [...action.data], favoriteCurrenciesData: [...newVal] }
		}
		case 'SET-FAVORITE-CURRENCIES': {
			for (let i = 0; i < state.favoriteCurrenciesData.length; i++) {
				if (state.favoriteCurrenciesData[i].currency === action.curr) {
					return { ...state } 
				}
			}

			return { ...state, favoriteCurrenciesData: [...state.favoriteCurrenciesData, ...state.currnciesData.filter(f => f.currency === action.curr)] }
		}
		default: {
			return state
		}
	}
}

//Action Creators
const setCurrencyAndValue = (data: Array<CurrenciesDataType>) => {
	return { type: 'SET-CURRENCY-AND-VALUE', data } as const
}

export const setFavoriteCurrencies = (curr: string) => {
	return { type: 'SET-FAVORITE-CURRENCIES', curr } as const
}

//Thunk
export const getCurrencyAndValue = (baseCurrency: string) => {
	return (dispatch: Dispatch) => {
		currency.getCurrenciesAndValue(baseCurrency)
			.then(res => {
				const data = [];

				for (let key in res.data.rates) {
					const newObj = {
						currency: key,
						value: res.data.rates[key]
					}
					data.push(newObj)
				}
				dispatch(setCurrencyAndValue(data));

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
	value: string
}

type ActionsType = ReturnType<typeof setCurrencyAndValue>
	| ReturnType<typeof setFavoriteCurrencies>