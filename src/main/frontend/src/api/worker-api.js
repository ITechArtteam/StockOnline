import axios from 'axios';
import { getWorkersSuccess, getWorkerSuccess, getWorkersUnsuccess, deleteWorkerSuccess, saveWorkerSuccess, saveWorkerUnsuccess, deleteWorkerUnsuccess } from '../actions/worker-actions';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';

export function getWorkers(thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/workers')
        .then(response => {
            console.log(response);
            store.dispatch(getWorkersSuccess(response.data));
            redirect(thenRedirectPath);
            return response;
        }).catch(error=>{
            console.log(error);
            store.dispatch(getWorkersUnsuccess(error.data));
            redirect(errorRedirectPath);
            return error
        });
}

export function getWorker(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/worker/'+id)
        .then(response => {
            console.log(response);
            store.dispatch(getWorkerSuccess(response.data));
            redirect(thenRedirectPath);
            return response;
        }).catch(error=>{
            console.log(error);
            store.dispatch(getWorkersUnsuccess(error.data))
            redirect(errorRedirectPath);
            return error
        });
}

export function deleteWorker(id, thenRedirectPath, errorRedirectPath) {
    return axios.delete('/api/worker/' + id)
        .then(response => {
            console.log(response);
            store.dispatch(deleteWorkerSuccess(id, "Работник удалён!"));
            redirect(thenRedirectPath);
            return response;
        }).catch(error=>{
            console.log(error);
            store.dispatch(deleteWorkerUnsuccess(error.data))
            redirect(errorRedirectPath);
            return error
        });
}

export function saveWorker(worker, thenRedirectPath, errorRedirectPath) {
    console.log("saveWorker")
    console.log(worker.roles)
    return axios.post('/api/worker/', worker)
        .then(response => {
            console.log(response);
            redirect(thenRedirectPath);
            store.dispatch(saveWorkerSuccess(worker,"Работник добавлен!"))
            return response;
        }).catch(error=>{
            console.log(error);
            store.dispatch(saveWorkerUnsuccess(error.data))
            redirect(errorRedirectPath);
            return error
        });
}

function redirect(path){
    if (path!=null){
        browserHistory.push(path);
    }
}
