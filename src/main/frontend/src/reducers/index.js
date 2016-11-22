import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {searchTransportCompanyForDriver} from "../containers/searchTransportCompanyForDriver";
import {searchTransportCompanyForTrain} from "../containers/searchTransportCompanyForTrain";
import {navigation} from "../containers/navigation";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import AuthReducer from './auth'
import workerReducer from "./worker-reducer";
import {stock} from '../containers/editStock/index';

const rootReducer = combineReducers({
    auth: AuthReducer,
    workerState:workerReducer,
    form: FormReducer,
    client,
    searchTransportCompanyForTrain,
    searchTransportCompanyForDriver,
    clientListReducer,
    stockListReducer,
    stock,
    navigation
});

export default rootReducer
