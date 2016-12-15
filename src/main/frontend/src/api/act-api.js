import axios from "axios";
import store from "../store/configureStore";
import {browserHistory} from "react-router";
import {
    getActSuccess,
    saveActUnsuccess,
    deleteActUnsuccess,
    closeActResponse,
    clearActReducer,
    getActUnsuccess,
    saveActInStoreSuccess
} from "../actions/act-actions";
import {deleteActSuccess, saveActSuccess} from "../actions/acts-actions";


export function getAct(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/act/' + id)
        .then(response => {
            store.dispatch(getActSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getActUnsuccess({
                title: "Ошибка 500.Ошибка на сервере",
            }))
            redirect(errorRedirectPath);
        });
}

export function deleteAct(id, thenRedirectPath, errorRedirectPath) {
    return axios.delete('/api/act/' + id)
        .then(response => {
            store.dispatch(deleteActSuccess(id, {
                title: "Удаление акта прошло успешно",
                type:"success"
            }));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(deleteActUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }))
            redirect(errorRedirectPath);
        });
}

export function saveAct(act, thenRedirectPath, errorRedirectPath) {
    return axios.post('/api/act/', act)
        .then(response => {
            store.dispatch(saveActSuccess(response.data, response))
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(saveActUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }))
            redirect(errorRedirectPath);
        });
}

export function saveActInStore(act, thenRedirectPath) {
    store.dispatch(saveActInStoreSuccess(act))
    redirect(thenRedirectPath);
}

export function saveActinStore(act, thenRedirectPath, errorRedirectPath) {
    store.dispatch(saveActSuccess(act))
}

export function clearReducer() {
    store.dispatch(clearActReducer())
}

export function closeResponse() {
    store.dispatch(closeActResponse());
}

function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}
