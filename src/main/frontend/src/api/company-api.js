import axios from 'axios';
import {getStockOwnerCompanySuccess, getStockOwnerCompanyUnsuccess, clearCompanyReducer} from '../actions/company-action';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';

export function getStockOwnerCompany(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/stock_owner_company/'+id)
        .then(response => {
            store.dispatch(getStockOwnerCompanySuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(getStockOwnerCompanyUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }))
            redirect(errorRedirectPath);
        });
}


export function clearReducer() {
    store.dispatch(clearCompanyReducer());
}

function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}