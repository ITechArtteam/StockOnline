import * as types from "../actions/action-types";
const initialState = {
        response: null,
        products: [],
        act_status: []

    }
    ;

const productsReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {products: action.products});

        case types.GET_PRODUCTS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, products:[]});

        case types.GET_ACT_STATUS_SUCCESS:
            return Object.assign({}, state, {act_status: action.act_status});

        case types.GET_ACT_STATUS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, act_status:[]});

        case types.INITIAL_STATE_PRODUCTS:
            return Object.assign({}, state, initialState);
    }
    return state;
}

export default productsReducer;
