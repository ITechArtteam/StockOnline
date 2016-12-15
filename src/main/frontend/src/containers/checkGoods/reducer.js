import * as event from './constants'
import * as types from "../../actions/action-types";
let initGoodsState = {
    waybill: {
        number: "",
        status: "",
        registeredBy: {
            name: '',
            surname: '',
            patronymic: ''
        },
        productInWaybills: [],
        transport: {
            type:"",
            number:"",
            storage:{type:""},
            driver: {passportNumber:"", firstNmae:"", lustName:"", patronymic:"",birthDate:""}
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
        case event.FIND_WAYBILL_BY_NUMBER_REQUEST:
            return state;
        case event.FIND_WAYBILL_BY_NUMBER_SUCCESS:
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

        case types.INITIAL_STATE_CHECK_GOODS:
            return Object.assign({}, state, initGoodsState);
        default:
            return state;
    }
}