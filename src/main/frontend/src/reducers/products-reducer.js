import * as types from "../actions/action-types";
const initialState = {
        response: null,
        products: []

    }
    ;

const productsReducer = function (state = initialState, action) {
    switch (action.type) {

        case types.GET_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {products: action.products});

        case types.GET_PRODUCTS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, products:[]});
    }
    return state;
}

export default productsReducer;
