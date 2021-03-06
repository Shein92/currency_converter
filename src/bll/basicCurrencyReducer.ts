import { currency } from './../api/API';
import { Dispatch } from 'redux'

const initialState: BasicCurrencyType = {
	currencyData: [
		{
			currency: '',
			symbol: ''
		}
	],
	baseCurrency: 'EUR'
}

export const basicCurrencyReducer = (state: BasicCurrencyType = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'SET-CURRENCY-DATA': {
			return { ...state, currencyData: [...action.data] }
		}
		case 'SET-BASE-CURRENCY': {
			return { ...state, baseCurrency: action.curr }
		}
		default: {
			return state
		}
	}
}
//Action Creators
const setCurrencyData = (data: Array<DataCurrencyType>) => {
	return { type: 'SET-CURRENCY-DATA', data } as const
}

export const setBaseCurrency = (curr: string) => {
	return { type: 'SET-BASE-CURRENCY', curr } as const
}

//Thunk
export const getCurrencies = () => {
	return (dispatch: Dispatch) => {
		currency.getCurrencies()
			.then(res => {
				let data = [];
				for (let key in res.data) {
					let newObj = {
						currency: key,
						symbol: res.data[key].symbol
					}
					data.push(newObj)
				}
				dispatch(setCurrencyData(data));
			})
	}
}

//Types
export type BasicCurrencyType = {
	currencyData: Array<DataCurrencyType>,
	baseCurrency: string | 'EUR'
}

export type DataCurrencyType = {
	currency: string,
	symbol: string
}
type ActionsType = ReturnType<typeof setCurrencyData>
	| ReturnType<typeof setBaseCurrency>