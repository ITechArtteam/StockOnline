import * as types from '../actions/action-types';

export function getActSuccess(act, response) {
    return {
        type: types.GET_ACT_SUCCESS ,
        response: response,
        act:act
    };
}


export function getQActUnsuccess(response) {
    return {
        type: types.GET_ACT_UNSUCCESS ,
        response:response
    };
}

export function deleteActUnsuccess(response) {
    return {
        type: types.DELETE_ACT_UNSUCCESS,
        response:response
    };
}

export function saveActUnsuccess(response) {
    return {
        type: types.POST_ACT_UNSUCCESS ,
        response:response
    };
}


export function closeActResponse() {
    return {
        type: types.CLOSE_ACT_RESPONSE,
    }
}

export function clearActReducer(){
    return {
        type: types.INITIAL_STATE_ACT,
    }
}