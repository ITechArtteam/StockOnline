import * as types from '../actions/action-types';

export function getWorkersSuccess(workers) {
    return {
        type: types.GET_WORKERS_SUCCESS ,
        workers
    };
}


export function getWorkersUnsuccess(error) {
    return {
        type: types.GET_WORKERS_UNSUCCESS ,
        message:error
    };
}

export function getWorkerSuccess(worker) {
    return {
        type: types.GET_WORKER_SUCCESS ,
        worker
    };
}


export function getWorkerUnsuccess(error) {
    return {
        type: types.GET_WORKER_UNSUCCESS ,
        message:error
    };
}

export function deleteWorkerSuccess(id, message) {
    return {
        type: types.DELETE_WORKER_SUCCESS,
        id: id,
        message:message
    };
}


export function deleteWorkerUnsuccess(error) {
    return {
        type: types.DELETE_WORKER_UNSUCCESS,
        message:error
    };
}

export function saveWorkerSuccess(worker, message) {
    return {
        type: types.POST_WORKER_SUCCESS ,
        worker:worker,
        message:message
    };
}

export function saveWorkerUnsuccess(error) {
    return {
        type: types.POST_WORKER_UNSUCCESS ,
        message:error
    };
}