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
        senderName: name
    }
}