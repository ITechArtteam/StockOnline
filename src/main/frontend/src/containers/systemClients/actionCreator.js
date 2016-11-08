import * as event from './constants'
import * as axios from "axios";

var getClientListRequest = () => {
    return {
        type: event.GET_CLIENT_LIST_REQUEST
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

var getClientList = (pageNumber, itemsCountPerPage) => {
    return dispatch => {
        dispatch(getClientListRequest());
        return axios
            .get('/stockOwners/page/' + pageNumber + '/limit/' + itemsCountPerPage)
            .then(response => dispatch(getClientListSuccess(response.data)))
            .catch(error => dispatch(getClientListFail(error.response)))
    }
};

export default {
    getClientList,
}