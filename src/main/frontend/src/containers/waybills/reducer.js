import * as event from './constants'

let initWaybillsState = {
    page: {
        activePage: 1,
        totalItemsCount: 0,
        itemsCountPerPage: 5,
        waybills: [],
    },
    alert: {
        isVisible: false,
        text: '',
        buttons: [],
        type: ''
    },
    frontend: {
        waybillTypeValue: '2',
        filterWaybillNumberValue: '',
        isFilterMessageVisible: false
    },
    waybillInfoModal: {
        isVisible: false,
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
                    placedCount: 0,
                    product: {
                        name: '',
                        unit: '',
                        storage: {
                            type: ''
                        },
                        places: [
                            {
                                shelfId: 0,
                                number: 0,
                                count: 0
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
                },
                driver: {}
            }
        }
    }
};

export default (state = initWaybillsState, action) => {
    switch (action.type) {
        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};
        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};

        case event.GET_WAYBILLS_SUCCESS:
            return {...state, page: action.payload};

        case event.SET_WAYBILL_TYPE_RADIO:
            return {...state, frontend: {...state.frontend, waybillTypeValue: action.payload}};
        case event.SET_FILTER_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};

        case event.SET_FILTER_MESSAGE_VISIBILITY:
            return {...state, frontend: {...state.frontend, isFilterMessageVisible: action.payload}};


        case event.SET_WAYBILL_INFO_MODAL_VISIBILITY:
            return {...state, waybillInfoModal: {...state.waybillInfoModal, isVisible: action.payload}};
        case event.SET_WAYBILL_INFO_MODAL_DATA:
            let waybills = state.page.waybills.filter(elem => {
                return elem.number === action.payload
            });
            return {...state, waybillInfoModal: {...state.waybillInfoModal, waybill: waybills[0]}};

        default:
            return state;
    }
}


