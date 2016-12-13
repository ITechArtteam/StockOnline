import * as event from './constants'
import * as axios from "axios";

let showDialog = (text, type, buttons) => {
    return {
        type: event.SHOW_DIALOG,
        payload: {
            isVisible: true,
            text: text,
            buttons: buttons,
            type: type
        }
    }
};

let closeDialog = () => {
    return {
        type: event.CLOSE_DIALOG
    }
};

let setWaybillTypeRadioValue = value => {
    return {
        type: event.SET_WAYBILL_TYPE_RADIO,
        payload: value
    }
};

let setFilterInputValue = (inputId, value) => {
    return {
        type: event.SET_FILTER_INPUT_VALUE,
        payload: {
            inputId: inputId,
            value: value
        }
    }

};

export default {
    showDialog,
    closeDialog,
    setWaybillTypeRadioValue,
    setFilterInputValue
}
