import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {searchTransportCompanyForDriver} from "../containers/searchTransportCompanyForDriver";
import {searchTransportCompanyForTrain} from "../containers/searchTransportCompanyForTrain";
import {navigation} from "../containers/navigation";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import AuthReducer from './auth'

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: FormReducer,
    client,
    searchTransportCompanyForTrain,
    searchTransportCompanyForDriver,
    clientListReducer,
    stockListReducer,
    navigation
});

export default rootReducer
