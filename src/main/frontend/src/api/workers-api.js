import axios from "axios";
import {
    getWorkersSuccess,
    getWorkersUnsuccess,
    deleteWorkersSuccess,
    deleteWorkersUnsuccess,
    closeWorkersResponse
} from "../actions/workers-actions";
import store from "../store/configureStore";
import {browserHistory} from "react-router";

export function getWorkers(thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/workers')
        .then(response => {
            store.dispatch(getWorkersSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getWorkersUnsuccess(error.response));
            redirect(errorRedirectPath);
        });
}

export function deleteWorkers(ids, thenRedirectPath, errorRedirectPath) {
    axios.delete('/api/workers?ids='+ids).then(response => {
        store.dispatch(deleteWorkersSuccess(ids, response));
        redirect(thenRedirectPath);
    }).catch(error=> {
        store.dispatch(deleteWorkersUnsuccess(error.response));
        redirect(errorRedirectPath);
    });
}

export function closeResponse() {
    store.dispatch(closeWorkersResponse());
}


function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}
