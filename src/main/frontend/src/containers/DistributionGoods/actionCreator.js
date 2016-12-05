import * as event from './constants'
import * as $ from "jquery";

let setInputValue = (nameField, value) => {
    return {
        type: event.SET_INPUT_VALUE,
        payload: {
            inputId: nameField,
            value: value
        }
    }
};

let setWaybillVisibility = visibility => {
    return {
        type: event.SET_WAYBILL_VISIBILITY,
        payload: visibility
    }
};

let setShelfModalVisibility = (visibility, rowIndex) => {
    return {
        type: event.SET_SELECT_SHELF_MODAL_VISIBILITY,
        payload: {
            isVisible: visibility,
            rowIndex: rowIndex
        }
    }
};


let showDialog = (text, type, buttons) => {
    return {
        type: event.SHOW_DIALOG,
        payload: {
            isVisible: true,
            text: text,
            buttons: buttons,
            type: type
        }
    }
};

let closeDialog = () => {
    return {
        type: event.CLOSE_DIALOG
    }
};


let findWaybillRequest = () => {
    return {
        type: event.FIND_WAYBILL_BY_NUMBER_REQUEST
    }
};

let findWaybillSuccess = json => {
    for(let i = 0; i < json.productInWaybills.length; ++i) {
        json.productInWaybills[i].product.places = [];
    }
    return {
        type: event.FIND_WAYBILL_BY_NUMBER_SUCCESS,
        payload: json
    }
};

let findWaybillByNumber = (number, status) => {
    return dispatch => {
        dispatch(findWaybillRequest());
        $.ajax({
            type: 'GET',
            url: `/checkgoods/waybills/${number}`,
            success: response => {
                let message = `Накладная №${number} успешно найдена`;
                if(response.status === status) {
                    dispatch(findWaybillSuccess(response));
                    dispatch(setWaybillVisibility(true));
                } else {
                    message += `, но ee статус "${response.status}" не соответствует запрашиваемому статусу "${status}"`;
                    dispatch(setWaybillVisibility(false));
                }
                dispatch(showDialog(message, '', []));
            },
            error: error => {
                dispatch(showDialog(`Накладная №${number}  не найдена. ${error.statusText}`, 'danger', []));
                dispatch(setWaybillVisibility(false));
            }
        });
    }
};

let addProductOnPlace = (rowIndex, shelfId) => {
    return {
        type: event.ADD_PRODUCT_ON_PLACE,
        payload: {
            rowIndex: rowIndex,
            shelfId: shelfId
        }
    }
};

let removeProductFromShelf = (rowIndex, shelfId) => {
    return {
        type: event.REMOVE_PRODUCT_FROM_PLACE,
        payload: {
            rowIndex: rowIndex,
            shelfId: shelfId
        }
    }
};

let findStocksByUserCompanySuccess = json => {
    let stocks = json.map((elem, index) => {
        return {
            value: elem.id,
            label: elem.name,
        }
    });
    return {
        type: event.FIND_STOCK_BY_USER_COMPANY_SUCCESS,
        payload: stocks
    }
};

let findStocksByUserCompany = ()=> {
    return dispatch => {
        $.ajax({
            type: 'GET',
            url: '/stockList/byUserCompany',
            success: response => {
                dispatch(findStocksByUserCompanySuccess(response))
            }
        })
    }
};

let selectStockValueChanged = (stockValue) => {
    return {
        type: event.SELECT_STOCK_VALUE_CHANGED,
        payload: stockValue
    }
};

export default {
    setInputValue,
    showDialog,
    closeDialog,
    findWaybillByNumber,
    setWaybillVisibility,
    setShelfModalVisibility,
    addProductOnPlace,
    removeProductFromShelf,
    findStocksByUserCompany,
    selectStockValueChanged
}
