import * as event from './constants'
import * as axios from "axios";


let setFilterMessageVisibility = visibility => {
    return {
        type: event.SET_FILTER_MESSAGE_VISIBILITY,
        payload: visibility
    }
};

let getWaybillsSuccess = json => {
    return {
        type: event.GET_WAYBILLS_SUCCESS,
        payload: json
    }
};

let getWaybills = (pageNumber, itemsCountPerPage) => {
    return (dispatch, getState) => {
        let number = getState().waybillsReducer.frontend.filterWaybillNumberValue;
        let status = getState().waybillsReducer.frontend.waybillTypeValue;

        let visibility = (status !== '2' || number !== '');
        dispatch(setFilterMessageVisibility(visibility));
        return axios
            .get(`/waybills/page/${pageNumber}/limit/${itemsCountPerPage}`,
                {
                    params: {
                        number: number,
                        status: status
                    }
                })
            .then(response => dispatch(getWaybillsSuccess(response.data)))
            .catch(error => dispatch(showDialog(`Произошла ошибка при получении списка накладных.${error}`, 'danger', [])))
    }
};

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
    setFilterInputValue,
    getWaybills
}
