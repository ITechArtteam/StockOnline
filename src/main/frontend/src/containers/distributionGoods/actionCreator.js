import * as event from './constants'
import * as $ from "jquery";
import * as axios from "axios";

let setInputValue = (nameField, value) => {
    return {
        type: event.SET_INPUT_VALUE,
        payload: {
            inputId: nameField,
            value: value
        }
    }
};

let setInputError = (nameField, value) => {
    return {
        type: event.SET_INPUT_ERROR,
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
    return dispatch => {
        dispatch(
            {
                type: event.SET_SELECT_SHELF_MODAL_VISIBILITY,
                payload: {
                    isVisible: visibility,
                    rowIndex: rowIndex
                }
            });
        dispatch(selectStockValueChanged(0));
        dispatch(setInputValue("itemCount", ''));
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
        json.productInWaybills[i].placedCount = 0;
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

let addProductOnPlace = (rowIndex, info) => {
    return {
        type: event.ADD_PRODUCT_ON_PLACE,
        payload: {
            rowIndex: rowIndex,
            info: info
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
    let stockOptions = json.map((elem, index) => {
        return {
            value: index,
            label: elem.name,
        }
    }).sort((a, b) => {
        return a.label.localeCompare(b.label);
    });
    for(let i = 0; i < json.length; ++i) {
        for(let j = 0; j < json[i].rooms.length; ++j) {
            for(let k = 0; k < json[i].rooms[j].shelves.length; ++k) {
                json[i].rooms[j].shelves[k].freeCount = json[i].rooms[j].shelves[k].capacity;
            }
        }
    }

    return {
        type: event.FIND_STOCK_BY_USER_COMPANY_SUCCESS,
        payload: {
            stocks: json,
            stockOptions: stockOptions
        }
    }
};

let findStocksByUserCompany = ()=> {
    return dispatch => {
        $.ajax({
            type: 'GET',
            url: '/stockList/byUserCompany',
            success: response => {
                dispatch(findStocksByUserCompanySuccess(response))
            },
            error: error => {
                console.log(error);
                dispatch(showDialog("Компания в которой вы работаете не найдена", "danger", []));
            }
        })
    }
};

let selectStockValueChangedSuccess = (stockValue) => {
    return {
        type: event.SELECT_STOCK_VALUE_CHANGED,
        payload: stockValue
    }
};

let selectStockValueChanged = (stockValue) => {
    return (dispatch, getState) => {
        dispatch(selectStockValueChangedSuccess(stockValue));
        let roomOptions = getState().distributionGoodsReducer.stocks[stockValue].rooms.map((elem, index) => {
            return {
                value: index,
                label: `${elem.number}, требования к хранению: ${elem.storage.type}`
            }
        }).sort((a, b) => {
            return a.label.localeCompare(b.label);
        });
        dispatch(setRoomOptions(roomOptions));
        if(roomOptions.length !== 0) {
            dispatch(selectRoomValueChanged(roomOptions[0].value));
        } else {
            dispatch(selectRoomValueChanged(-1))
        }
    }
};

let setRoomOptions = options => {
    return {
        type: event.SET_ROOM_OPTIONS,
        payload: options
    }
};

let selectRoomValueChangedSuccess = (roomValue) => {
    return {
        type: event.SELECT_ROOM_VALUE_CHANGED,
        payload: roomValue
    }
};

let getSelectedShelves = productInWaybills => {
    let resultArray = productInWaybills.map((elem, index) => {
        return elem.product.places.map((elem, index) => {
            return elem.shelfId;
        })
    });
    let tmp = resultArray[0];
    for(let i = 1; i < resultArray.length; ++i) {
        tmp = tmp.concat(resultArray[i]);
    }
    return tmp;
};

let selectRoomValueChanged = (roomValue) => {
    return (dispatch, getState) => {
        dispatch(selectRoomValueChangedSuccess(roomValue));
        let stockValue = getState().distributionGoodsReducer.selectShelfModal.selectedStockValue;
        let selectedShelves = getSelectedShelves(getState().distributionGoodsReducer.waybill.productInWaybills);
        let shelfOptions = getState().distributionGoodsReducer.stocks[stockValue].rooms[roomValue].shelves
            .map((elem, index) => {
                return {
                    index: index,
                    elem: elem
                }
            })
            .filter(elem => {
                // return elem.elem.free && !selectedShelves.includes(elem.elem.id);
                return elem.elem.free && (elem.elem.freeCount > 0)
            })
            .map((elem, index) => {
                return {
                    value: elem.index,
                    label: `${elem.elem.number}, свободно: ${elem.elem.freeCount}/${elem.elem.capacity}`,
                    freeCount: elem.elem.freeCount
                }
            }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            });
        dispatch(setShelfOptions(shelfOptions));
        if(shelfOptions.length !== 0) {
            dispatch(selectShelfValueChanged(shelfOptions[0].value));
        } else {
            dispatch(selectShelfValueChanged(-1))
        }
    }
};

let setShelfOptions = options => {
    return {
        type: event.SET_SHELF_OPTIONS,
        payload: options
    }
};

let selectShelfValueChanged = (shelfValue) => {
    return {
        type: event.SELECT_SHELF_VALUE_CHANGED,
        payload: shelfValue
    }
};

let finishDistribution = () => {
    return (dispatch, getState)=> {
        let products = getState().distributionGoodsReducer.waybill.productInWaybills.map((elem, index) => {
            return {
                waybillNumber: getState().distributionGoodsReducer.waybill.number,
                productId: elem.product.id,
                shelves: elem.product.places.map((elem, index) => { return{ shelfId: elem.shelfId, count: elem.count }})
            }
        });
        console.log("products - ", products);
        axios.post('/distributionGoods/finish', products)
            .then(response => {
                dispatch(showDialog('Размещение выполнено успешно','', []));
                dispatch(setWaybillVisibility(false));
            })
            .catch(error => {
                dispatch(showDialog('Произошла ошибка при размещении продукции','danger', []));
            });
    }
};

let setIsStockSelected = isSelected => {
    return {
        type: event.SET_IS_STOCK_SELECTED,
        payload: isSelected
    }
};

let clearState = () => {
    return dispatch => {
        dispatch({ type: event.CLEAR_STATE });
        dispatch(findStocksByUserCompany());
    }
};

export default {
    setInputValue,
    setInputError,
    showDialog,
    closeDialog,
    findWaybillByNumber,
    setWaybillVisibility,
    setShelfModalVisibility,
    addProductOnPlace,
    removeProductFromShelf,
    findStocksByUserCompany,
    selectStockValueChanged,
    selectRoomValueChanged,
    selectShelfValueChanged,
    finishDistribution,
    setIsStockSelected,
    clearState
}
