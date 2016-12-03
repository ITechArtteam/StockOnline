import * as event from './constants'

let initDistributionGoodsState = {
    waybill: {
        id: 123,
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
    },
    selectShelfModal: {
        isVisible: false,
    }
};

export default (state = initDistributionGoodsState, action) => {
    switch (action.type) {

        case event.FIND_WAYBILL_BY_ID_REQUEST:
            return state;
        case event.FIND_WAYBILL_BY_ID_SUCCESS:
            return {
                ...state, waybill: action.payload
            };

        case event.SET_WAYBILL_VISIBILITY:
            return {...state, frontend: {...state.frontend, waybillVisible: action.payload}};
        case event.SET_SELECT_SHELF_MODAL_VISIBILITY:
            return {...state, selectShelfModal: {...state.selectShelfModal, isVisible: action.payload}};

        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};
        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};

        case event.SET_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};
        default:
            return state;
    }
}


