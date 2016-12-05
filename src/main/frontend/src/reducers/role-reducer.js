import * as types from "../actions/action-types";

const initialState = {
        roles: [],
    }
    ;

const roleReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ROLES_SUCCESS:
            return Object.assign({}, state, {roles: action.roles});
        case types.GET_ROLES_UNSUCCESS:
            return Object.assign({}, state, {responce: action.responce, roles:[]});
    }
    return state;
}

export default roleReducer;
