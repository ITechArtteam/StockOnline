import axios from 'axios';
import { getWorkerSuccess, saveWorkerUnsuccess, deleteWorkerUnsuccess, closeWorkerResponse } from '../actions/worker-actions';
import { getWorkersSuccess, getWorkersUnsuccess, deleteWorkerSuccess, saveWorkerSuccess, closeWorkersResponse } from '../actions/workers-actions';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';



export function getWorker(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/worker/'+id)
        .then(response => {
            store.dispatch(getWorkerSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(getWorkersUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function deleteWorker(id, thenRedirectPath, errorRedirectPath) {
    return axios.delete('/api/worker/' + id)
        .then(response => {
            store.dispatch(deleteWorkerSuccess(id, response));
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(deleteWorkerUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function saveWorker(worker, thenRedirectPath, errorRedirectPath) {
    console.log(worker)
    return axios.post('/api/worker/', worker)
        .then(response => {
            console.log(response)
            store.dispatch(saveWorkerSuccess(response.data,response))
            redirect(thenRedirectPath);
        }).catch(error=>{
            console.log(error)
            store.dispatch(saveWorkerUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function closeResponse(){
    store.dispatch(closeWorkerResponse());
}

function redirect(path){
    if (path!==null && path!==undefined){
        browserHistory.push(path);
    }
}


