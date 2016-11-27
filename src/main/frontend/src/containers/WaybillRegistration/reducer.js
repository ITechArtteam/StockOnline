import * as Actions from './actions'

const initialState = {
    number: "",
    registrationDate: null,
    senderName: "",
    senderInfo: null,
    sendersList: [
        {
            name: 'TEST_FIRST_SENDER_NAME'
        },
        {
            name: 'TEST_SECOND_SENDER_NAME'
        }
    ],
    carrierName: "",
    carrierId: null,
    numbers: [],
    driver: {
        id: 1,
        firstName: 'TEST_DRIVER_FIRSTNAME',
        lastName: 'TEST_DRIVER_LASTNAME',
        patronymic: 'TEST_DRIVER_PATRONYMIC',
        passportNumber: 'zx500'
    },
    description: "",
    products: [
        {
            name: 'first product',
            cost: '10',
            count: '2',
            storage: 'none'
        }
    ],
    chooseSenderModalIsOpen: false,
    chooseCarrierModalFormIsOpen: false,
    transportTypes: [
        {
            value: 'AUTO', label: 'Автомобиль'
        },
        {
            value: 'TRAIN', label: 'Поезд'
        }
    ],
    transportType: null,
    selectSenderModal: {
        senders: [],
        selectedSender: null
    }
};

export default function waybillRegistrationForm(state = initialState, action) {

    switch (action.type) {

        case Actions.CHANGE_WAYBILL_SENDER_NAME:
            return {
                ...state,
                number: action.senderName
            };

        case Actions.CHANGE_WAYBILL_NUMBER:
            return {
                ...state,
                number: action.number
            };

        case Actions.HIDE_CHOOSE_SENDER_MODAL:
            return {
                ...state,
                chooseSenderModalIsOpen: false
            };

        case Actions.SHOW_CHOOSE_SENDER_MODAL:
            return {
                ...state,
                chooseSenderModalIsOpen: true
            };

        case Actions.EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE:
            return {
                ...state,
                transportType: action.transportType
            };

        case Actions.CHOOSE_SENDER_MODAL_LOAD_SENDERS:
            return {
                ...state,
                senders: action.senders
            };

        case Actions.CHOOSE_SENDER_MODAL_SELECT_SENDER:
            return {
                ...state,
                selectedSender: action.selectedSender
            };

        case Actions.EDIT_WAYBILL_FORM_SHOW_CHOOSE_CARRIER_MODAL_FORM:
            return {
                ...state,
                chooseCarrierModalFormIsOpen: true
            };

        case Actions.EDIT_WAYBILL_FORM_HIDE_CHOOSE_CARRIER_MODAL_FORM:
            return {
                ...state,
                chooseCarrierModalFormIsOpen: false
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_WAYBILL_DESCRIPTION:
            return {
                ...state,
                description: action.description
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_REGISTRATION_DATE:
            return {
                ...state,
                registrationDate: action.date
            };

        default:
            return state;
    }
}