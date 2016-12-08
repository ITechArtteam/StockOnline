import * as types from "../actions/action-types";
const initialState = {
        response: null,
        act: {
            id: "",
            reportDate: "",
            products_in_act:[],
            status:"",
            user:{
                id:"",
                login:""
            }
        }
    }
    ;


const actReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ACT_SUCCESS:
            return Object.assign({}, state, {act: action.act});

        case types.GET_ACT_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_ACT_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.POST_ACT_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, act: action.act});

        case types.CLOSE_ACT_RESPONSE:
            return Object.assign({}, state, {response: null});

        case types.INITIAL_STATE_ACT:
            return Object.assign({}, state, initialState);
    }
    return state;
}

export default actReducer;

