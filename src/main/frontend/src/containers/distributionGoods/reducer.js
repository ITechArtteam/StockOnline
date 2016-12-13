import * as event from './constants'
import * as $ from "jquery";

let initDistributionGoodsState = {
    waybill: {
        number: 0,
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
                    name: '',
                    unit: '',
                    storage: {
                        type: ''
                    },
                    places: [
                        {
                            shelfId: 0,
                            number: 0
                        }
                    ]
                }
            },
        ],
        transport: {
            type: 0,
            number: '',
            storage: {
                type: ''
            }
        }
    },
    stocks: [],
    stockOptions: [{value: 0, label: ''}],
    roomOptions: [],
    shelfOptions: [],
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
        isStockSelected: false,
        isVisible: false,
        rowIndex: 0,
        selectedStockValue: -1,
        selectedRoomValue: -1,
        selectedShelfValue: -1
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
            return {...state, selectShelfModal: {...state.selectShelfModal, isVisible: action.payload.isVisible, rowIndex: action.payload.rowIndex}};

        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};
        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};

        case event.SET_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};

        case event.ADD_PRODUCT_ON_PLACE:
            let newProductInWaybill = state.waybill.productInWaybills;
            newProductInWaybill[action.payload.rowIndex].product.places.push(action.payload.info);
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
            return {...state, stocks: action.payload.stocks, stockOptions: action.payload.stockOptions};

        case event.SELECT_STOCK_VALUE_CHANGED:
            return {...state, selectShelfModal: {...state.selectShelfModal, selectedStockValue: action.payload}};
        case event.SELECT_ROOM_VALUE_CHANGED:
            return {...state, selectShelfModal: {...state.selectShelfModal, selectedRoomValue: action.payload}};
        case event.SELECT_SHELF_VALUE_CHANGED:
            return {...state, selectShelfModal: {...state.selectShelfModal, selectedShelfValue: action.payload}};

        case event.SET_ROOM_OPTIONS:
            return {...state, roomOptions: action.payload };
        case event.SET_SHELF_OPTIONS:
            return {...state, shelfOptions: action.payload };
        case event.SET_IS_STOCK_SELECTED:
            return {...state, selectShelfModal: {...state.selectShelfModal, isStockSelected: action.payload}};
        default:
            return state;
    }
}


