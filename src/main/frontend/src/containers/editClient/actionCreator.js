import * as event from "./constants";
import * as axios from "axios";

function getClientDataRequest() {
    return {
        type: event.GET_CLIENT_REQUEST
    }
}

function getClientDataSuccess(json) {
    return {
        type: event.GET_CLIENT_SUCCESS,
        data: json
    }
}

function getClientDataFail(dataError) {
    return {
        type: event.GET_CLIENT_FAIL,
        data: dataError
    }
}

function getClient(clientName) {
    return function (dispatch) {
        dispatch(getClientDataRequest());
        return axios
            .get(`/customer/${clientName}`)
            .then(json =>
                dispatch(getClientDataSuccess(json.data))
            ).catch(error => {
                dispatch(getClientDataFail(error.response.data))
            });
    }
}

function addClientRequest() {
    return {
        type: event.ADD_CLIENT_REQUEST
    }
}

function addClientSuccess(data) {
    return {
        type: event.ADD_CLIENT_SUCCESS,
        data: data
    }
}

function addClientFail(error) {
    try {
        $.parseJSON(error);
        return {
            type: event.ADD_CLIENT_FAIL,
            data: error
        }
    } catch(e){
        return {
            type: event.ADD_CLIENT_FAIL,
            data: ""
        }
    }

}

function addClient(client) {
    return function (dispatch) {
        dispatch(addClientRequest());

        return axios
            .post(`/customer/`, client)
            .then(json =>
                dispatch(addClientSuccess(json.data))
            ).catch(error => {
                dispatch(addClientFail(error.response.data))
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

function setVisibilityPassword(nameField) {
    return {
        type: event.SET_VISIBILITY_PASSWORD,
        data: {
            nameField
        }
    }
}


function setData(nameField, value) {
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


export default {
    getClient,
    setData,
    addClient,
    setInputErrorMessage,
    setVisibilityPassword,
    showAlertPopup,
    closeAlertPopup
};
