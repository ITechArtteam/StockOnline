import * as event from "./constants";
import * as axios from "axios";
import {changeCarrierName, setTransportType, setCarrier} from "../WaybillRegistration/actions.js";
import {browserHistory} from "react-router";

function setInputErrorMessage(nameField, message) {
    return {
        type: event.SET_INPUT_ERROR_MESSAGE,
        data: {
            nameField,
            message
        }
    }
}

function setFieldData(nameField, value) {
    return {
        type: event.SET_FIELD,
        data: {
            nameField,
            value
        }
    }
}

function showAlertPopup(type, message) {
    return {
        type: event.SHOW_ALERT_POPUP,
        data: {
            type,
            message
        }
    }
}

function closeAlertPopup() {
    return {
        type: event.CLOSE_ALERT_POPUP
    }
}


function getTrainDataRequest() {
    return {
        type: event.GET_TRAIN_REQUEST
    }
}

function getTrainDataSuccess(json) {

    return {
        type: event.GET_TRAIN_SUCCESS,
        data: {
            json
        }
    }
}

function getTrainDataFail(error, transferCompany, dispatch) {
    return {
        type: event.GET_TRAIN_FAIL,
        data: {
            showAlertPopup: true,
            typeAlertPopup: "danger",
            messageAlertPop: error.response.data,
            buttons: [
                {
                    transferCompanyName: transferCompany,
                    btnStyle: "btn btn-success",
                    text: "Создать",
                    onclick: () => dispatch(addTransferCompany(transferCompany))
                }
            ]
        }
    }
}

function addTransferCompanySuccess(json) {

    return {
        type: event.ADD_TRANSFER_COMPANY_SUCCESS,
        data: {
            json
        }
    }
}

function addTransferCompanyFail() {
    return {
        type: event.ADD_TRANSFER_COMPANY_FAIL,
        data: {
            showAlertPopup: true,
            typeAlertPopup: "danger",
            messageAlertPop: "Компания не создана."
        }
    }
}
function addTransferCompany (transferCompanyName) {
    return function (dispatch) {
        return axios
            .post(`/registrationOfGoods/train/add/${transferCompanyName}`)
            .then( json => {
                dispatch(getTrainDataSuccess(json.data));
                dispatch(changeCarrierName(json.data.name));
                let carrier = {
                    id: json.data.id,
                    name: json.data.name
                };
                dispatch(setCarrier(carrier));
                dispatch(setTransportType("TRAIN"));
                browserHistory.push('/registerwaybill');
                }
            ).catch((error) => {
                dispatch(addTransferCompanyFail(error))
            });
    }
}
function changeTransferCompany(transferCompanyName) {
    return {
        type: event.EDIT_TRANSFER_COMPANY,
        data: transferCompanyName
    }
}

function getTrain(transferCompanyName) {
    return function (dispatch) {
        dispatch(getTrainDataRequest());
        return axios
            .get(`/registrationOfGoods/train/${transferCompanyName}`)
            .then(json => {
                    dispatch(getTrainDataSuccess(json.data));
                    dispatch(changeCarrierName(json.data.name));
                    let carrier = {
                        id: json.data.id,
                        name: json.data.name
                    };
                    dispatch(setCarrier(carrier));
                    dispatch(setTransportType("TRAIN"));
                    browserHistory.push('/registerwaybill');
                }
            ).catch((error) => {
                dispatch(getTrainDataFail(error,transferCompanyName, dispatch))
            });
    }
}

function setDefaultValue() {
    return {
        type: event.SET_DEFAULT_VALUE
    }
}

export default {
    setInputErrorMessage,
    setFieldData,
    showAlertPopup,
    closeAlertPopup,
    getTrain,
    setDefaultValue
};
