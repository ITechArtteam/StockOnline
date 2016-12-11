import axios from 'axios';
import {getStockOwnerCompanySuccess, getStockOwnerCompanyUnsuccess} from '../actions/company-action';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';

export function getStockOwnerCompany(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/stock_owner_company/'+id)
        .then(response => {
            store.dispatch(getStockOwnerCompanySuccess(response.data, response));
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(getStockOwnerCompanyUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}