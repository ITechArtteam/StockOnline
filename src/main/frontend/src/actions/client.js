import {SET_TEXT, GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS} from "../constants/client";
import * as axios from "axios";

function setText(text) {
    return {
        type: SET_TEXT,
        text
    }
}

function getClientDataRequest(clientName) {
    return {
        type: GET_CLIENT_REQUEST,
        clientName
    }
}

function getClientDataSuccess(clientName, json) {
    return {
        type: GET_CLIENT_SUCCESS,
        clientName,
        data: json
    }
}


export function fetchClientData(clientName) {
    return function (dispatch) {


        dispatch(getClientDataRequest(clientName));


        return axios
            .get(`/client/${clientName}`)
            .then(json =>
                dispatch(getClientDataSuccess(clientName, json.data))
            )

    }
}

export const client = {
    setText,
    fetchClientData
};
