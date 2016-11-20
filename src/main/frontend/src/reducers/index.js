import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {navigation} from "../containers/navigation";
import {clientListReducer} from '../containers/systemClients/index';
import {stockListReducer} from '../containers/stocks/index';
import {checkOutputGoodsReducer} from '../containers/checkOutputGoods/index'
import AuthReducer from './auth'

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: FormReducer,
    client,
    clientListReducer,
    stockListReducer,
    navigation,
    checkOutputGoodsReducer
});

export default rootReducer
