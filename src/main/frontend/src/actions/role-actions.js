import * as types from '../actions/action-types';

export function getRolesSuccess(roles) {
    return {
        type: types.GET_ROLES_SUCCESS ,
        roles
    };
}

