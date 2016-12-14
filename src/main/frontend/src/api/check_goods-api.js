import axios from 'axios';
import {clearCheckGoodsReducer} from '../actions/check_goods-action';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';

export function clearReducer() {
    store.dispatch(clearCheckGoodsReducer());

}