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