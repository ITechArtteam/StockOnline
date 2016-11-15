import axios from 'axios';
import { getWorkersSuccess, getWorkerSuccess, deleteWorkerSuccess, saveWorkerSuccess } from '../actions/worker-actions';


export function getWorkers() {
    return axios.get('/workers')
        .then(response => {
            store.dispatch(getWorkersSuccess(response.data));
            return response;
        });
}

export function getWorker(id) {
    return axios.get('/workers/'+id)
        .then(response => {
            store.dispatch(getWorkerSuccess(response.data));
            return response;
        });
}

export function deleteWorker(id) {
    return axios.delete('/worker/' + id)
        .then(response => {
            store.dispatch(deleteWorkerSuccess(id));
            return response;
        });
}






