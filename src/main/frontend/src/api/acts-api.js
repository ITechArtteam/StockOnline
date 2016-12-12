import axios from "axios";
import store from "../store/configureStore";
import {browserHistory} from "react-router";
import {
    getActsSuccess,
    getActsUnsuccess,
    deleteActsSuccess,
    deleteActsUnsuccess,
    closeActsResponse,
    clearActsReducer
} from "../actions/acts-actions";

export function getActs(thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/acts')
        .then(response => {
            store.dispatch(getActsSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getActsUnsuccess(error.response));
            redirect(errorRedirectPath);
        });
}

export function getActsByCompany(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/acts_by_company?id='+id)
        .then(response => {
            console.log(response)
            store.dispatch(getActsSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getActsUnsuccess(error.response));
            redirect(errorRedirectPath);
        });
}

export function deleteActs(ids, thenRedirectPath, errorRedirectPath) {
    axios.delete('/api/acts?ids='+ids).then(response => {
        store.dispatch(deleteActsSuccess(ids, response));
        redirect(thenRedirectPath);
    }).catch(error=> {
        store.dispatch(deleteActsUnsuccess(error.response));
        redirect(errorRedirectPath);
    });
}
export function clearReducer() {
    store.dispatch(clearActsReducer());

}

export function closeResponse() {
    store.dispatch(closeActsResponse());
}


function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}

