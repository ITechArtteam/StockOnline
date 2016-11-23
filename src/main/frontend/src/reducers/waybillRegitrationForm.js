import {
    HIDE_CHOOSE_SENDER_MODAL,
    SHOW_CHOOSE_SENDER_MODAL,
    CHANGE_WAYBILL_NUMBER,
    CHANGE_WAYBILL_SENDER_NAME
} from '../actions/waybillRegistrationFormActions'

const initialState = {
    number: "",
    registrationDate: null,
    senderName: "",
    senderId: null,
    carrierName: "",
    carrierId: null,
    numbers: [],
    driverId: null,
    description: "",
    products: [],
    chooseSenderModalIsOpen: false,
    chooseCarrierModalIsOpen: false
};

export default function waybillRegistrationForm(state = initialState, action) {
    switch (action.type) {
        case CHANGE_WAYBILL_SENDER_NAME: {
            return {
                ...state,
                number: action.senderName
            }
        }
        case CHANGE_WAYBILL_NUMBER:
            return {
                ...state,
                number: action.number
            };
        case HIDE_CHOOSE_SENDER_MODAL:
            return {
                ...state,
                chooseSenderModalIsOpen: false
            };
        case SHOW_CHOOSE_SENDER_MODAL:
            return {
                ...state,
                chooseSenderModalIsOpen: true
            };
        default:
            return state;
    }
}