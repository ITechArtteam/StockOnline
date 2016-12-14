import * as event from "./constants";
import * as axios from "axios";
import {changeCarrierName, setCarrier} from "../WaybillRegistration/actions.js";
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

function getDriverDataRequest() {
    return {
        type: event.GET_DRIVER_REQUEST
    }
}

function getDriverDataSuccess(json) {

    return {
        type: event.GET_DRIVER_SUCCESS,
        data: {
            name: json.firstName,
            surname: json.lastName,
            patronymic: json.patronymic,
            birthday: json.birthDate,
            issued_by: json.passportIssuedBy,
            issued_date: json.passportIssuedDate,
            serialAndNumber: json.passportNumber,
            id: json.id
        }
    }
}

function createDiver() {
    browserHistory.push('/goods/departure/editDriver');
}

function getDriverDataFail(dataError) {
    return {
        type: event.GET_DRIVER_FAIL,
        data: {
            ...dataError.data,
            buttons: [
                {
                    btnStyle: "btn btn-success",
                    text: "Создать",
                    onclick: createDiver
                }
            ]
        }
    }
}

function getDriver(passportNumber) {
    return function (dispatch) {
        dispatch(getDriverDataRequest());
        dispatch(disableNextButton());
        return axios
            .get(`/registrationOfGoods/${passportNumber}`)
            .then(json => {
                    dispatch(getDriverDataSuccess(json.data));
                    dispatch(enableNextButton());
                    axios.get(`/transfercompanies/driver/${json.data.id}`)
                        .then(json => {
                            dispatch(changeCarrierName(json.data.name));
                            let carrier = {
                                id: json.data.id,
                                name: json.data.name
                            };
                            dispatch(setCarrier(carrier));
                        });
                }
            ).catch(error => {
                dispatch(getDriverDataFail(error.response))
            });
    }
}

function setDefaultValue() {
    return {
        type: event.SET_DEFAULT_VALUE
    }
}

function enableNextButton() {
    return {
        type: event.ENABLE_NEXT_BUTTON
    }
}

function disableNextButton() {
    return {
        type: event.DISABLE_NEXT_BUTTON
    }
}

export default {
    setInputErrorMessage,
    setFieldData,
    showAlertPopup,
    closeAlertPopup,
    getDriver,
    setDefaultValue
};
