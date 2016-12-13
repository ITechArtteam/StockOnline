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
    }
};

export default (state = initWaybillsState, action) => {
    switch (action.type) {
        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};

        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};
        case event.SET_WAYBILL_TYPE_RADIO:
            return {...state, frontend: {...state.frontend, waybillTypeValue: action.payload}};
        case event.SET_FILTER_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};

        case event.SET_FILTER_MESSAGE_VISIBILITY:
            return {...state, frontend: {...state.frontend, isFilterMessageVisible: action.payload}};
        default:
            return state;
    }
}


