import axios from 'axios';
import { getWorkersSuccess, getWorkerSuccess, deleteWorkerSuccess, saveWorkerSuccess } from '../actions/worker-actions';
import store from '../store/store'
import {browserHistory} from 'react-router';

export function getWorkers() {
    return axios.get('/api/workers')
        .then(response => {
            store.dispatch(getWorkersSuccess(response.data));
            return response;
        }).catch(error=>{
        });
}

export function getWorker(id) {
    return axios.get('/api/worker/'+id)
        .then(response => {
            store.dispatch(getWorkerSuccess(response.data));
            return response;
        }).catch(error=>{
        });
}

export function deleteWorker(id) {
    return axios.delete('/api/worker/' + id)
        .then(response => {
            store.dispatch(deleteWorkerSuccess(id));
            return response;
        });
}

export function saveWorker(worker) {
    console.log("saveWorker")
    console.log(worker)
    return axios.post('/api/worker/', worker)
        .then(response => {
            return response;
        });
}






