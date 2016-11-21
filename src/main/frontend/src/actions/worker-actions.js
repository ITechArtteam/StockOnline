import * as types from '../actions/action-types';

export function getWorkersSuccess(workers) {
    return {
        type: types.GET_WORKERS_SUCCESS ,
        workers
    };
}

export function getWorkerSuccess(worker) {
    return {
        type: types.GET_WORKER_SUCCESS ,
        worker
    };
}

export function deleteWorkerSuccess(id) {
    return {
        type: types.DELETE_WORKER_SUCCESS,
        id
    };
}

export function saveWorkerSuccess(worker) {
    return {
        type: types.POST_WORKER_SUCCESS ,
        worker
    };
}