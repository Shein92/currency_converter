import axios from 'axios';

const API_KEY = '982b4ee772a1fe385484';

export const currency = {
	getCurrencies() {
		return axios.get('https://api.vatcomply.com/currencies')
	},
	getCurrenciesAndValue(base: string) {
		return axios.get(`https://api.vatcomply.com/rates?base=${base}`)
	},
	getFullListOfCurrencies() {
		return axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`)
	},
	getExhangeRate(curr1: string, curr2: string) {
		return axios.get(`https://free.currconv.com/api/v7/convert?q=${curr1}_${curr2}&compact=ultra&apiKey=${API_KEY}`)
	}
}