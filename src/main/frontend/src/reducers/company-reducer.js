import * as types from "../actions/action-types";

const initialState = {
        response: null,
        stockOwnerCompany: {
            id: "",
            name: ""
        }
    }
    ;

const companyReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_STOCK_OWNER_COMPANY_SUCCESS:
            return Object.assign({}, state, {stockOwnerCompany: action.stockOwnerCompany});

        case types.GET_STOCK_OWNER_COMPANY_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});
    }
    return state;
}

export default companyReducer;