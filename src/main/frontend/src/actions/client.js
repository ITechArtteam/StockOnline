import * as event from "../constants/client";
import * as axios from "axios";

function getClientDataRequest(clientName) {
    return {
        type: event.GET_CLIENT_REQUEST,
        clientName
    }
}

function getClientDataSuccess(clientName, json) {
    return {
        type: event.GET_CLIENT_SUCCESS,
        clientName,
        data: json
    }
}

function getClientDataFail(clientName, error) {
    return {
        type: event.GET_CLIENT_FAIL,
        clientName,
        error
    }
}


function addClient(clientName) {
    return function (dispatch) {
        dispatch(getClientDataRequest(clientName));

        return axios
            .get(`/client/${clientName}`)
            .then(json =>
                dispatch(getClientDataSuccess(clientName, json.data))
            ).catch(error => {
                dispatch(getClientDataFail(clientName, error))
            });

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


export const client = {
    addClient,
    setData
};
