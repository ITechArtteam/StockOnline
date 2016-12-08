import * as types from '../actions/action-types';

export function getActsSuccess(acts) {
    return {
        type: types.GET_ACTS_SUCCESS ,
        acts: acts
    };
}


export function getActsUnsuccess(response) {
    return {
        type: types.GET_ACTS_UNSUCCESS ,
        response:response,
    };
}


export function deleteActSuccess(id, response) {
    return {
        type: types.DELETE_ACT_SUCCESS,
        id: id,
        response:response
    };
}

export function deleteActsUnsuccess(response) {
    return {
        type: types.DELETE_ACTS_UNSUCCESS,
        response:response
    };
}

export function deleteActsSuccess(ids, response) {
    return {
        type: types.DELETE_ACTS_SUCCESS,
        response:response,
        ids:ids,
    };
}

export function saveActSuccess(act, response) {
    return {
        type: types.POST_ACT_SUCCESS ,
        act:act,
        response:response
    };
}

export function closeActsResponse() {
    return {
        type: types.CLOSE_ACTS_RESPONSE
    };
}
