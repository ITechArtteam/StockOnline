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

function getClient(clientName) {
    return function (dispatch) {
        dispatch(getClientDataRequest(clientName));

        return axios
            .get(`/customer/${clientName}`)
            .then(json =>
                dispatch(getClientDataSuccess(clientName, json.data))
            ).catch(error => {
                dispatch(getClientDataFail(clientName, error))
            });
    }
}

function addClientRequest(client) {
    return {
        type: event.ADD_CLIENT_REQUEST,
        client
    }
}

function addClientSuccess(client, json) {
    return {
        type: event.ADD_CLIENT_SUCCESS,
        client,
        data: json
    }
}

function addClientFail(client, error) {
    return {
        type: event.ADD_CLIENT_FAIL,
        client,
        error
    }
}

function addClient(client) {
    return function (dispatch) {
        dispatch(addClientRequest(client));

        return axios
            .post(`/customer/`, client)
            .then(json =>
                dispatch(addClientSuccess(client, json))
            ).catch(error => {
                dispatch(addClientFail(client, error))
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
    getClient,
    setData,
    addClient
};
