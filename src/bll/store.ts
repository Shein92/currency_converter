import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import { basicCurrencyReducer } from "./basicCurrencyReducer";
import { converterReducer } from "./converterReducer";
import { currenctRateReducer } from "./currencyRateReducer";

const rootReducer = combineReducers({
    basicCurrency: basicCurrencyReducer,
    converter: converterReducer,
    currency: currenctRateReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>