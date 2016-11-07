import * as event from './constants'
import * as axios from "axios";

var getClientListRequest = (pageNumber) => {
    return {
        type: event.GET_CLIENT_LIST_REQUEST,
        payload: pageNumber
    }
};

var getClientListSuccess = json => {
    return {
        type: event.GET_CLIENT_LIST_SUCCESS,
        payload: json
    }
};

var getClientListFail = error => {
    return {
        type: event.GET_CLIENT_LIST_FAIL,
        payload: error
    }
};

var getClientList = (pageNumber, recordsCount) => {
    return dispatch => {
        dispatch(getClientListRequest(pageNumber));
        return axios
            .get('/stockOwners/page/' + pageNumber + '/limit/' + recordsCount)
            .then(response => dispatch(getClientListSuccess(response.data)))
            .catch(error => dispatch(getClientListFail(error.response)))
    }
};

var setPageLimit = limit => {
    return {
        type: event.SET_PAGE_LIMIT_ACTION,
        payload: limit
    }
};

export default {
    getClientList,
    setPageLimit,
}