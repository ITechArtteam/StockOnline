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
        data: dataError.data
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
                dispatch(getClientDataFail(error.response))
            });
    }
}

export default {
    getClient
};
