import * as types from '../actions/action-types';

export function getWorkersSuccess(workers) {
    return {
        type: types.GET_WORKERS_SUCCESS ,
        workers: workers
    };
}


export function getWorkersUnsuccess(response) {
    return {
        type: types.GET_WORKERS_UNSUCCESS ,
        response:response
    };
}


export function deleteWorkerSuccess(id, response) {
    return {
        type: types.DELETE_WORKER_SUCCESS,
        id: id,
        response:response
    };
}

export function deleteWorkersUnsuccess(response) {
    return {
        type: types.DELETE_WORKERS_UNSUCCESS,
        response:response
    };
}

export function deleteWorkersSuccess(ids, response) {
    return {
        type: types.DELETE_WORKERS_SUCCESS,
        response:response,
        ids:ids,
    };
}

export function saveWorkerSuccess(worker, response) {
    return {
        type: types.POST_WORKER_SUCCESS ,
        response:response
    };
}



export function closeWorkersResponse() {
    return {
        type: types.CLOSE_WORKERS_RESPONSE
    };
}
