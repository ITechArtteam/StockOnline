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
import WaybillRegistrationFormReducer from './waybillRegitrationForm'
import workerReducer from "./worker-reducer";
import {stock} from '../containers/editStock/index';
import roleReducer from "./role-reducer"
const rootReducer = combineReducers({
    waybillRegistrationForm: WaybillRegistrationFormReducer,
    auth: AuthReducer,
    workerState:workerReducer,
    form: FormReducer,
    roleState:roleReducer,
    client,
    searchTransportCompanyForTrain,
    searchTransportCompanyForDriver,
    clientListReducer,
    stockListReducer,
    navigation,
    checkOutputGoodsReducer,
    stock
});

export default rootReducer
