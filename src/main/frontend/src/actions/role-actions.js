import * as types from '../actions/action-types';

export function getRolesSuccess(roles) {
    return {
        type: types.GET_ROLES_SUCCESS ,
        roles
    };
}

export function getRolesUnsuccess(response) {
    return {
        type: types.GET_ROLES_UNSUCCESS ,
        response:response
    };
}

export function clearRoleReducer() {
    return {
        type: types.INITIAL_STATE_ROLES,
    }
}

