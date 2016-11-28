export const CHANGE_WAYBILL_NUMBER = 'CHANGE_WAYBILL_NUMBER';
export const EDIT_WAYBILL_FORM_CHANGE_REGISTRATION_DATE = 'EDIT_WAYBILL_FORM_CHANGE_REGISTRATION_DATE';
export const CHANGE_WAYBILL_SENDER_NAME = 'CHANGE_WAYBILL_SENDER_NAME';
export const CHANGE_WAYBILL_CARRIER_NAME = 'CHANGE_WAYBILL_CARRIER_NAME';
export const CHANGE_WAYBILL_TRANSPORT_NUMBER = 'CHANGE_WAYBILL_TRANSPORT_NUMBER';
export const CHANGE_WAYBILL_DRIVER_ID = 'CHANGE_WAYBILL_DRIVER_ID';
export const EDIT_WAYBILL_FORM_CHANGE_WAYBILL_DESCRIPTION = 'EDIT_WAYBILL_FORM_CHANGE_WAYBILL_DESCRIPTION';
export const HIDE_CHOOSE_SENDER_MODAL = 'HIDE_CHOOSE_SENDER_MODAL';
export const SHOW_CHOOSE_SENDER_MODAL = 'SHOW_CHOOSE_SENDER_MODAL';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE = 'EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE';
export const CHOOSE_SENDER_MODAL_LOAD_SENDERS = 'CHOOSE_SENDER_MODAL_LOAD_SENDERS';
export const CHOOSE_SENDER_MODAL_SELECT_SENDER = 'CHOOSE_SENDER_MODAL_SELECT_SENDER';
export const EDIT_WAYBILL_FORM_SHOW_CHOOSE_CARRIER_MODAL_FORM = 'EDIT_WAYBILL_FORM_SHOW_CHOOSE_CARRIER_MODAL_FORM';
export const EDIT_WAYBILL_FORM_HIDE_CHOOSE_CARRIER_MODAL_FORM = 'EDIT_WAYBILL_FORM_HIDE_CHOOSE_CARRIER_MODAL_FORM';
export const EDIT_WAYBILL_FORM_SELECT_CARRIER = 'EDIT_WAYBILL_FORM_SELECT_CARRIER';
export const EDIT_WAYBILL_FORM_CHANGE_CAR_NUMBER = 'EDIT_WAYBILL_FORM_CHANGE_CAR_NUMBER';
export const EDIT_WAYBILL_FORM_CHANGE_TRAILER_NUMBER = 'EDIT_WAYBILL_FORM_CHANGE_TRAILER_NUMBER';
export const EDIT_WAYBILL_FORM_SELECT_NUMBER = 'EDIT_WAYBILL_FORM_SELECT_NUMBER';
export const EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_SHOW = 'EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_SHOW';
export const EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_HIDE = 'EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_HIDE';
export const EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_CHANGE_NUMBER = 'EDIT_WAYBILL_ADD_NUMBER_MODAL_FORM_CHANGE_NUMBER';
export const EDIT_WAYBILL_FORM_ADD_NUMBER = 'EDIT_WAYBILL_FORM_ADD_NUMBER';
export const EDIT_WAYBILL_FORM_DELETE_NUMBER = 'EDIT_WAYBILL_FORM_DELETE_NUMBER';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_SHOW = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_SHOW';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_HIDE = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_HIDE';
export const EDIT_WAYBILL_FORM_SELECT_PRODUCT = 'EDIT_WAYBILL_FORM_SELECT_PRODUCT';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT = 'EDIT_WAYBILL_FORM_ADD_PRODUCT';
export const EDIT_WAYBILL_FORM_DELETE_PRODUCT = 'EDIT_WAYBILL_FORM_DELETE_PRODUCT';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_NAME = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_NAME';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_PRICE = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_PRICE';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_COUNT = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_COUNT';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_STORAGE = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_STORAGE';
export const EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CLEAR_FIELDS = 'EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CLEAR_FIELDS';
export const EDIT_WAYBILL_FORM_CHANGE_SENDER_NAME = 'EDIT_WAYBILL_FORM_CHANGE_SENDER_NAME';
export const EDIT_WAYBILL_FORM_CHANGE_CARRIER_NAME = 'EDIT_WAYBILL_FORM_CHANGE_CARRIER_NAME';
export const EDIT_WAYBILL_FORM_SET_DRIVER_INFO = 'EDIT_WAYBILL_FORM_SET_DRIVER_INFO';
export const EDIT_WAYBILL_FORM_SET_SENDERS = 'EDIT_WAYBILL_FORM_SET_SENDERS';
export const EDIT_WAYBILL_FORM_SET_CARRIERS = 'EDIT_WAYBILL_FROM_SET_CARRIERS';
export const EDIT_WAYBILL_FORM_SELECT_SENDER = 'EDIT_WAYBILL_FORM_SELECT_SENDER';
export const EDIT_WAYBILL_FORM_SET_SENDER = 'EDIT_WAYBILL_FROM_SET_SENDER';
export const EDIT_WAYBILL_FORM_SET_CARRIER = 'EDIT_WAYBILL_FROM_SET_CARRIER';

export function setSender(sender) {
    return {
        type: EDIT_WAYBILL_FORM_SET_SENDER,
        sender
    }
}

export function setCarrier(carrier) {
    return {
        type: EDIT_WAYBILL_FORM_SET_CARRIER,
        carrier
    }
}

export function selectSender(sender) {
    return {
        type: EDIT_WAYBILL_FORM_SELECT_SENDER,
        sender
    }
}

export function loadSenders() {
    const senders = [
        {
            id: 1,
            name: 'FIRST_TEST_LOADED_SENDER'
        },
        {
            id: 2,
            name: 'SECOND_TEST_LOADED_SENDER'
        }
    ];
    return function(dispatch) {
        dispatch(setSenders(senders));
    }
}

export function loadCarriers() {
    const carriers = [
        {
            id: 1,
            name: 'FIRST_TEST_LOADED_CARRIER'
        },
        {
            id: 2,
            name: 'SECOND_TEST_LOADED_CARRIER'
        }
    ];
    return function(dispatch) {
        dispatch(setCarriers(carriers));
    }
}

export function setSenders(senders) {
    return {
        type: EDIT_WAYBILL_FORM_SET_SENDERS,
        senders
    }
}

export function setCarriers(carriers) {
    return {
        type: EDIT_WAYBILL_FORM_SET_CARRIERS,
        carriers
    }
}

export function setDriverInfo(driverInfo) {
    return {
        type: EDIT_WAYBILL_FORM_SET_DRIVER_INFO,
        driverInfo
    }
}

export function changeSenderName(name) {
    return {
        type: EDIT_WAYBILL_FORM_CHANGE_SENDER_NAME,
        name
    }
}

export function changeCarrierName(name) {
    return {
        type: EDIT_WAYBILL_FORM_CHANGE_CARRIER_NAME,
        name
    }
}

export function clearAddProductModalFormFields() {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CLEAR_FIELDS
    }
}

export function changeProductName(name) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_NAME,
        name
    }
}

export function changeProductPrice(price) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_PRICE,
        price
    }
}

export function changeProductCount(count) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_COUNT,
        count
    }
}

export function changeProductStorage(storage) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_STORAGE,
        storage
    }
}

export function selectProduct(productName) {
    return {
        type: EDIT_WAYBILL_FORM_SELECT_PRODUCT,
        productName
    }
}

export function addProduct(product) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT,
        product
    }
}

export function deleteProduct(productName) {
    return {
        type: EDIT_WAYBILL_FORM_DELETE_PRODUCT,
        productName
    }
}

export function showAddProductModalForm() {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_SHOW
    }
}

export function hideAddProductModalForm() {
    return {
        type: EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_HIDE
    }
}

export function deleteNumber(number) {
    return {
        type: EDIT_WAYBILL_FORM_DELETE_NUMBER,
        number
    }
}

export function addNumber(number) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_NUMBER,
        number
    }
}

export function showAddNumberModalForm() {
    return {
        type: EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_SHOW
    }
}

export function hideAddNumberModalForm() {
    return {
        type: EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_HIDE
    }
}

export function changeBeingCreatedNumber(number) {
    return {
        type: EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_CHANGE_NUMBER,
        number
    }
}

export function selectNumber(number) {
    return {
        type: EDIT_WAYBILL_FORM_SELECT_NUMBER,
        number
    }
}

export function changeCarNumber(number) {
    return {
        type: EDIT_WAYBILL_FORM_CHANGE_CAR_NUMBER,
        number
    }
}

export function changeTrailerNumber(number) {
    return {
        type: EDIT_WAYBILL_FORM_CHANGE_TRAILER_NUMBER,
        number
    }
}

export function selectCarrier(carrier) {
    return {
        type: EDIT_WAYBILL_FORM_SELECT_CARRIER,
        carrier
    }
}

export function changeRegistrationDate(date) {
    return {
        type: EDIT_WAYBILL_FORM_CHANGE_REGISTRATION_DATE,
        date
    }
}

export function changeWaybillDescription(description) {
    return {
        type: EDIT_WAYBILL_FORM_CHANGE_WAYBILL_DESCRIPTION,
        description
    }
}

export function showChooseCarrierModalForm() {
    return {
        type: EDIT_WAYBILL_FORM_SHOW_CHOOSE_CARRIER_MODAL_FORM
    }
}

export function hideChooseCarrierModalForm() {
    return {
        type: EDIT_WAYBILL_FORM_HIDE_CHOOSE_CARRIER_MODAL_FORM
    }
}

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