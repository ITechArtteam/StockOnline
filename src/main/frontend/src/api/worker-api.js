import axios from "axios";
import {
    getStockOwnerCompanySuccess,
    getStockOwnerCompanyUnsuccess,
    getWorkerSuccess,
    closeWorkerResponse,
    clearWorkerReducer,
    saveWorkerUnsuccess
} from "../actions/worker-actions";
import {getWorkersUnsuccess, deleteWorkerSuccess, saveWorkerSuccess} from "../actions/workers-actions";
import store from "../store/configureStore";
import {browserHistory} from "react-router";


export function getWorker(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/worker/' + id)
        .then(response => {
            store.dispatch(getWorkerSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(getWorkersUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }))
        });
}


export function deleteWorker(id, thenRedirectPath, errorRedirectPath) {
    return axios.delete('/api/worker/' + id)
        .then(response => {
            store.dispatch(deleteWorkerSuccess(id, {type: "success", title: "Работник удалён удачно."}));
            redirect(thenRedirectPath);
        }).catch(error=> {
            store.dispatch(deleteWorkersUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
            }))
        });
}

export function saveWorker(worker, thenRedirectPath, errorRedirectPath) {
    return axios.post('/api/worker/', worker)
        .then(response => {
            store.dispatch(saveWorkerSuccess(response.data, {type: "success", title: "Работник добавлен удачно."}))
            redirect(thenRedirectPath);
        }).catch(error=> {
            if (error.response.status == 400) {
                var data = error.response.data;
                var rows = [];
                for (var p in data) {
                    if (data.hasOwnProperty(p)) {
                        rows.push(data[p])
                    }
                }
                store.dispatch(saveWorkerUnsuccess(worker, {
                    type: "danger",
                    title: "Ошибка 400.Ошибка валидации.",
                    text: rows
                }))
            } else {
                store.dispatch(saveWorkerUnsuccess(worker, {
                    type: "danger",
                    title: "Ошибка 500.Ошибка на сервере",
                    text: ["Информация об ошибке отправлена разработчикам."]
                }))
            }
            redirect(errorRedirectPath);
        });
}

export function closeResponse() {
    store.dispatch(closeWorkerResponse());
}


export function clearReducer() {
    store.dispatch(clearWorkerReducer())
}

function redirect(path) {
    if (path !== null && path !== undefined) {
        browserHistory.push(path);
    }
}


