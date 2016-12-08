import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {searchTransportCompanyForDriver} from "../containers/searchTransportCompanyForDriver";
import {searchTransportCompanyForTrain} from "../containers/searchTransportCompanyForTrain";
import {navigation} from "../containers/navigation";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import {checkGoodsReducer} from '../containers/checkGoods/index'
import AuthReducer from './auth'
import WaybillRegistrationFormReducer from './../containers/WaybillRegistration/reducer'
import productsReducer from "./products-reducer";
import workerReducer from "./worker-reducer";
import workersReducer from "./workers-reducer";
import companyReducer from "./company-reducer";
import actReducer from "./act-reducer";
import actsReducer from "./acts-reducer";
import Stock from '../containers/editStock/reducer';
import Driver from './../containers/editDriver/reducer';
import roleReducer from "./role-reducer"
import {distributionGoodsReducer} from '../containers/DistributionGoods/index'

const rootReducer = combineReducers({
    waybillRegistrationForm: WaybillRegistrationFormReducer,
    auth: AuthReducer,
    companyState:companyReducer,
    workerState:workerReducer,
    workersState:workersReducer,
    actState:actReducer,
    actsState:actsReducer,
    productsState:productsReducer,
    form: FormReducer,
    roleState:roleReducer,
    client,
    searchTransportCompanyForTrain,
    searchTransportCompanyForDriver,
    clientListReducer,
    stockListReducer,
    navigation,
    checkGoodsReducer,
    stock: Stock,
    distributionGoodsReducer,
    driver: Driver
});

export default rootReducer
