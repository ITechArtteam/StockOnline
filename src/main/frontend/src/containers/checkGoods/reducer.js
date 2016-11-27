import * as event from './constants'

let initGoodsState = {
    waybill: {
        id: 123,
        status: 0,
        productInWaybills: [
            {
                count: 10,
                product: {
                    name: 'Яблоко',
                    unit: 1,
                    storage: {
                        type: 'Нет требований'
                    }
                }
            },
            {
                count: 20,
                product: {
                    name: 'Груша',
                    unit: 2,
                    storage: {
                        type: 'Нет требований'
                    }
                }
            }],
        transport: {
            type: 1,
            number: 'AC 2013',
            storage: {
                type: 'Нет требований'
            }
        }
    },
    alert: {
        isVisible: false,
        text: '',
        buttons: [],
        type: ''
    },
    frontend: {
        waybillId: '',
        waybillVisible: false
    }
};

export default (state = initGoodsState, action) => {
    switch (action.type) {
        case event.FIND_WAYBILL_BY_ID_REQUEST:
            return state;
        case event.FIND_WAYBILL_BY_ID_SUCCESS:
            return {
                ...state, waybill: action.payload
            };

        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};
        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};

        case event.SET_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};

        case event.ACCEPT_WAYBILL_REQUEST:
            return state;
        case event.SET_WAYBILL_VISIBILITY:
            return {...state, frontend: {...state.frontend, waybillVisible: action.payload}};
        default:
            return state;
    }
}