import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {searchTransportCompanyForDriver} from "../containers/searchTransportCompanyForDriver";
import {searchTransportCompanyForTrain} from "../containers/searchTransportCompanyForTrain";
import {navigation} from "../containers/navigation";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import {checkOutputGoodsReducer} from '../containers/checkOutputGoods/index'
import AuthReducer from './auth'
import workerReducer from "./worker-reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    workerState:workerReducer,
    form: FormReducer,
    client,
    searchTransportCompanyForTrain,
    searchTransportCompanyForDriver,
    clientListReducer,
    stockListReducer,
    navigation,
    checkOutputGoodsReducer
});

export default rootReducer
