import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import AuthReducer from './auth'

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: FormReducer,
    client, clientListReducer, stockListReducer
});

export default rootReducer
