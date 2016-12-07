import * as types from "../actions/action-types";

export function getStockOwnerCompanySuccess(stockOwnerCompany, response){
    return {
        type: types.GET_STOCK_OWNER_COMPANY_SUCCESS,
        response: response,
        stockOwnerCompany: stockOwnerCompany
    };

}

export function getStockOwnerCompanyUnsuccess(response){
    return {
        type: types.GET_STOCK_OWNER_COMPANY_UNSUCCESS,
        response: response,
    };
}
