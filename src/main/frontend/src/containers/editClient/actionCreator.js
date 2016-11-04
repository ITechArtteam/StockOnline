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

function getClientDataFail(error) {
    return {
        type: event.GET_CLIENT_FAIL,
        error
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
                dispatch(getClientDataFail(error))
            });
    }
}

function addClientRequest() {
    return {
        type: event.ADD_CLIENT_REQUEST
    }
}

function addClientSuccess() {
    return {
        type: event.ADD_CLIENT_SUCCESS
    }
}

function addClientFail(error) {
    return {
        type: event.ADD_CLIENT_FAIL,
        error
    }
}

function addClient(client) {
    return function (dispatch) {
        dispatch(addClientRequest());

        return axios
            .post(`/customer/`, client)
            .then(json =>
                dispatch(addClientSuccess())
            ).catch(error => {
                dispatch(addClientFail(error))
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


function setData(nameField, value) {
    return {
        type: event.SET_FIELD,
        data: {
            nameField,
            value
        }
    }
}


export default {
    getClient,
    setData,
    addClient,
    setInputErrorMessage
};
