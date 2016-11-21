import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {navigation} from "../containers/navigation";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import AuthReducer from './auth'
import workerReducer from "./worker-reducer";
import roleReducer from "./role-reducer"

const rootReducer = combineReducers({
    auth: AuthReducer,
    roleState:roleReducer,
    workerState:workerReducer,
    form: FormReducer,
    client,
    clientListReducer,
    stockListReducer,
    navigation
});

export default rootReducer
