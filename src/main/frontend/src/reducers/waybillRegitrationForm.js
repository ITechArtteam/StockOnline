import { HIDE_CHOOSE_SENDER_MODAL, SHOW_CHOOSE_SENDER_MODAL } from '../actions/waybillRegistrationFormActions'

const initialState = {
    number: null,
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
        case HIDE_CHOOSE_SENDER_MODAL:
            alert(action.type);
            return {
                ...state,
                chooseSenderModalIsOpen: false
            };
        case SHOW_CHOOSE_SENDER_MODAL:
            alert('show reducer');
            return {
                ...state,
                chooseSenderModalIsOpen: true
            };
        default:
            return state;
    }
}