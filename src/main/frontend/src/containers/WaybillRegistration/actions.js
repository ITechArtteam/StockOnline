export const CHANGE_WAYBILL_NUMBER = 'CHANGE_WAYBILL_NUMBER';
export const CHANGE_WAYBILL_REGISTRATION_DATE = 'CHANGE_WAYBILL_REGISTRATION_DATE';
export const CHANGE_WAYBILL_SENDER_NAME = 'CHANGE_WAYBILL_SENDER_NAME';
export const CHANGE_WAYBILL_CARRIER_NAME = 'CHANGE_WAYBILL_CARRIER_NAME';
export const CHANGE_WAYBILL_TRANSPORT_NUMBER = 'CHANGE_WAYBILL_TRANSPORT_NUMBER';
export const CHANGE_WAYBILL_DRIVER_ID = 'CHANGE_WAYBILL_DRIVER_ID';
export const CHANGE_WAYBILL_DESCRIPTION = 'CHANGE_WAYBILL_DESCRIPTION';
export const HIDE_CHOOSE_SENDER_MODAL = 'HIDE_CHOOSE_SENDER_MODAL';
export const SHOW_CHOOSE_SENDER_MODAL = 'SHOW_CHOOSE_SENDER_MODAL';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE = 'EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE';
export const CHOOSE_SENDER_MODAL_LOAD_SENDERS = 'CHOOSE_SENDER_MODAL_LOAD_SENDERS';
export const CHOOSE_SENDER_MODAL_SELECT_SENDER = 'CHOOSE_SENDER_MODAL_SELECT_SENDER';

export function hideChooseSenderModal() {
    return {
        type: HIDE_CHOOSE_SENDER_MODAL
    }
}

export function showChooseSenderModal() {
    return {
        type: SHOW_CHOOSE_SENDER_MODAL
    }
}

export function changeWaybillNumber(number) {
    return {
        type: CHANGE_WAYBILL_NUMBER,
        number
    }
}

export function changeWaybillSenderName(name) {
    return {
        type: CHANGE_WAYBILL_SENDER_NAME,
        senderName: name
    }
}

export function setTransportType(type) {
    return {
        type: EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE,
        transportType: type
    }
}

export function loadSenders() {
    return {
        type: CHOOSE_SENDER_MODAL_LOAD_SENDERS,
        senders: [{name: 'first_sender'}, {name: 'second_sender'}]
    }
}

export function selectSender(sender) {
    return {
        type: CHOOSE_SENDER_MODAL_SELECT_SENDER,
        selectedSender: sender
    }
}