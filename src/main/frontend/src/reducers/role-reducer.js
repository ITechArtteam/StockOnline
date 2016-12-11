import * as types from "../actions/action-types";

const initialState = {
        response:null,
        roles: [],
    }
    ;

const roleReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ROLES_SUCCESS:
            return Object.assign({}, state, {roles: action.roles});
        case types.GET_ROLES_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, roles:[]});
        case types.INITIAL_STATE_ROLES:
            return Object.assign({}, state, initialState);
    }
    return state;
}

export default roleReducer;
