import * as types from "../actions/action-types";


export function getWorkerSuccess(worker, response) {
    return {
        type: types.GET_WORKER_SUCCESS,
        response: response,
        worker: worker
    };
}


export function getWorkerUnsuccess(response) {
    return {
        type: types.GET_WORKER_UNSUCCESS,
        response: response
    };
}

export function deleteWorkerUnsuccess(response) {
    return {
        type: types.DELETE_WORKER_UNSUCCESS,
        response: response
    };
}

export function saveWorkerUnsuccess(response) {
    return {
        type: types.POST_WORKER_UNSUCCESS,
        response: response
    };
}

export function closeWorkerResponse() {
    return {
        type: types.CLOSE_WORKER_RESPONSE,
    }
}
export function clearWorkerReducer() {
    return {
        type: types.INITIAL_STATE_WORKER,
    }
}