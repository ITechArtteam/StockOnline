import * as types from '../actions/action-types';


export function getProductsSuccess(products) {
    return {
        type: types.GET_PRODUCTS_SUCCESS ,
        products:products
    };
}


export function getProductsUnsuccess(response) {
    return {
        type: types.GET_PRODUCTS_UNSUCCESS ,
        response:response
    };
}


export function getActStatusSuccess(act_status) {
    return {
        type: types.GET_ACT_STATUS_SUCCESS,
        act_status:act_status
    };
}

export function getActStatusUnsuccess(response) {
    return {
        type: types.GET_ACT_STATUS_UNSUCCESS,
        response:response
    };
}