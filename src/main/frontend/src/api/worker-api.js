import axios from 'axios';
import {getStockOwnerCompanySuccess, getStockOwnerCompanyUnsuccess, getWorkerSuccess, saveWorkerUnsuccess, deleteWorkerUnsuccess, closeWorkerResponse, clearWorkerReducer } from '../actions/worker-actions';
import { getWorkersUnsuccess, deleteWorkerSuccess, saveWorkerSuccess} from '../actions/workers-actions';
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
            store.dispatch(saveWorkerSuccess(response.data,response))
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(saveWorkerUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function closeResponse(){
    store.dispatch(closeWorkerResponse());
}


export function clearReducer(){
    store.dispatch(clearWorkerReducer())
}

function redirect(path){
    if (path!==null && path!==undefined){
        browserHistory.push(path);
    }
}


