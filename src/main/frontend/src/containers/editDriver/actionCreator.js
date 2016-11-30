import * as event from "./constants";
import * as axios from "axios";

function getDriverDataRequest() {
    return {
        type: event.GET_DRIVER_REQUEST
    }
}

function getDriverDataSuccess(json) {
    return {
        type: event.GET_DRIVER_SUCCESS,
        data: json
    }
}

function getDriverDataFail(dataError) {
    return {
        type: event.GET_DRIVER_FAIL,
        data: dataError.data
    }
}

function getDriver(driverName) {
    return function (dispatch) {
        dispatch(getDriverDataRequest());
        return axios
            .get(`/editDriver/${driverName}`)
            .then(json =>
                dispatch(getDriverDataSuccess(json.data))
            ).catch(error => {
                dispatch(getDriverDataFail(error.response))
            });
    }
}

function addDriverRequest() {
    return {
        type: event.ADD_DRIVER_REQUEST
    }
}

function changeBirthDate(date) {
    return {
        type:  event.EDIT_DRIVER_CHANGE_BIRTH_DATE,
        date
    }
}

function changePassportIssuedDate(date) {
    return {
        type:  event.EDIT_DRIVER_CHANGE_PASSPORT_ISSUED_DATE,
        date
    }
}

function addDriverSuccess(data) {
    return {
        type: event.ADD_DRIVER_SUCCESS,
        data: data
    }
}

function addDriverFail(error) {
    if (error.status == 400) {
        return {
            type: event.ADD_DRIVER_FAIL,
            data: {
                firstName: !!error.data.firstName ? error.data.firstName : "",
                lastName: !!error.data.lastName ? error.data.lastName : "",
                fatherName: !!error.data.fatherName ? error.data.fatherName : "",
                birtDate: !!error.data.birtDate ? error.data.birtDate : "",
                transferCompany: !!error.data.transferCompany ? error.data.transferCompany : "",
                passportNumber: !!error.data.passportNumber ? error.data.passportNumber : "",
                passportIssuedBy: !!error.data.passportIssuedBy ? error.data.passportIssuedBy : "",
                passportIssuedDate: !!error.data.passportIssuedDate ? error.data.passportIssuedDate : ""

            }
        }
    } else {
        return {
            type: event.ADD_DRIVER_FAIL,
            data: ""
        }
    }
}

function addDriver(driver) {
    return function (dispatch) {
        dispatch(addDriverRequest());

        return axios
            .post(`/editDriver/`, driver)
            .then(json =>
                dispatch(addDriverSuccess(json.data))
            ).catch(error => {
                dispatch(addDriverFail(error.response))
            });
    }
}

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

function setDefaultValue() {
    return {
        type: event.SET_DEFAULT_VALUE
    }
}

export default {
    changePassportIssuedDate,
    changeBirthDate,
    getDriver,
    setFieldData,
    addDriver,
    setInputErrorMessage,
    showAlertPopup,
    closeAlertPopup,
    setDefaultValue
};
