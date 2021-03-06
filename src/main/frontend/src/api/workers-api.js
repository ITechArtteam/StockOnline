import axios from "axios";
import {
    getWorkersSuccess,
    getWorkersUnsuccess,
    deleteWorkersSuccess,
    deleteWorkersUnsuccess,
    closeWorkersResponse,
    clearWorkersReducer
} from "../actions/workers-actions";
import store from "../store/configureStore";
import {browserHistory} from "react-router";

export function getWorkers(thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/workers')
        .then(response => {
            store.dispatch(getWorkersSuccess(response.data));
            redirect(thenRedirectPath);
            return true;
        }).catch(error=> {
            store.dispatch(getWorkersUnsuccess({
                title: "Ошибка 500.Ошибка на сервере",
            }));
            redirect(errorRedirectPath);
            return false;
        });
}

export function getWorkersByCompany(idCompany, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/workers_by_company?idCompany='+idCompany)
        .then(response => {
            store.dispatch(getWorkersSuccess(response.data));
            redirect(thenRedirectPath);
            return true;
        }).catch(error=> {
            store.dispatch(getWorkersUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }));
            redirect(errorRedirectPath);
            return false;
        });
}

export function getControllers(thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/controllers')
        .then(response => {
            store.dispatch(getWorkersSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getWorkersUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }));
            redirect(errorRedirectPath);
        });
}

export function deleteWorkers(ids, thenRedirectPath, errorRedirectPath) {
    return axios.delete('/api/workers?ids='+ids).then(response => {
        store.dispatch(deleteWorkersSuccess(ids, {
            title: "Удаление работников прошло успешно",
            type:"success"
        }));
        redirect(thenRedirectPath);
        return true;

    }).catch(error=> {
        store.dispatch(deleteWorkersUnsuccess({
            type: "danger",
            title: "Ошибка 500.Ошибка на сервере",
        }));
        redirect(errorRedirectPath);
        return false;
    });
}

export function clearReducer(){
    store.dispatch(clearWorkersReducer())
}

export function closeResponse() {
    store.dispatch(closeWorkersResponse());
}


function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}
