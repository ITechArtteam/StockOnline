import * as event from './constants'
import * as $ from "jquery";

let initDistributionGoodsState = {
    waybill: {
        number: 123,
        status: 0,
        registeredBy: {
            name: '',
            surname: '',
            patronymic: ''
        },
        productInWaybills: [
            {
                count: 10,
                product: {
                    name: 'Яблоко',
                    unit: 1,
                    storage: {
                        type: 'Нет требований'
                    },
                    places: []
                }
            },
            {
                count: 20,
                product: {
                    name: 'Груша',
                    unit: 2,
                    storage: {
                        type: 'Нет требований'
                    },
                    places: []
                }
            }
        ],
        transport: {
            type: 1,
                number: 'AC 2013',
                storage: {
                type: 'Нет требований'
            }
        }
    },
    stocks: [],
    alert: {
        isVisible: false,
        text: '',
        buttons: [],
        type: ''
    },
    frontend: {
        waybillId: '',
        waybillVisible: false
    },
    selectShelfModal: {
        isVisible: false,
        rowIndex: 0,
        selectedStockValue: 0
    }
};

export default (state = initDistributionGoodsState, action) => {
    switch (action.type) {

        case event.FIND_WAYBILL_BY_NUMBER_REQUEST:
            return state;
        case event.FIND_WAYBILL_BY_NUMBER_SUCCESS:
            return {
                ...state, waybill: action.payload
            };

        case event.SET_WAYBILL_VISIBILITY:
            return {...state, frontend: {...state.frontend, waybillVisible: action.payload}};
        case event.SET_SELECT_SHELF_MODAL_VISIBILITY:
            return {...state, selectShelfModal: action.payload};

        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};
        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};

        case event.SET_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};

        case event.ADD_PRODUCT_ON_PLACE:
            let newProductInWaybill = state.waybill.productInWaybills;
            newProductInWaybill[action.payload.rowIndex].product.places.push({shelfId: action.payload.shelfId});
            return {...state, waybill: {...state.waybill, productInWaybills: newProductInWaybill}};

        case event.REMOVE_PRODUCT_FROM_PLACE:
            newProductInWaybill = state.waybill.productInWaybills;
            let arr = newProductInWaybill[action.payload.rowIndex].product.places;
            arr = $.grep(arr, (elem, index) => {
                return elem.shelfId !== action.payload.shelfId;
            });
            newProductInWaybill[action.payload.rowIndex].product.places = arr;
            return {...state, waybill: {...state.waybill, productInWaybills: newProductInWaybill}};

        case event.FIND_STOCK_BY_USER_COMPANY_SUCCESS:
            return {...state, stocks: action.payload};
        case event.SELECT_STOCK_VALUE_CHANGED:
            return {...state, selectShelfModal: {...state.selectShelfModal, selectedStockValue: action.payload}};
        default:
            return state;
    }
}


