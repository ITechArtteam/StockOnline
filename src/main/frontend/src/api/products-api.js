import axios from 'axios';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';
import {
    getProductsSuccess,
    getProductsUnsuccess
} from "../actions/products-actions";
export function getProducts(thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/products')
        .then(response => {
            store.dispatch(getProductsSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getProductsUnsuccess(error.response));
            redirect(errorRedirectPath);
        });
}

function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}
