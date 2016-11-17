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

var showDialog = (text, buttons) => {
    return {
        type: event.SHOW_DIALOG,
        payload: {
            isVisible: true,
            text: text,
            buttons: buttons
        }
    }
};

var closeDialog = () => {
    return {
        type: event.CLOSE_DIALOG
    }
};

var deleteClientsRequest = () => {
    return {
        type: event.DELETE_CLIENT_LIST_REQUEST
    }
};

var deleteClientsSuccess = () => {
    return {
        type: event.DELETE_CLIENT_LIST_SUCCESS,
        payload: {
            isVisible: true,
            text: "Удаление успешно.",
            buttons: []
        }
    }
};

var deleteClientFail = () => {
    return {
        type: event.DELETE_CLIENT_LIST_FAIL,
        payload: {
            isVisible: true,
            text: "Произошла ошибка при удалении.",
            buttons: [],
            type: 'danger'
        }
    }
};

var deleteClients = clientNamesList => {
    return (dispatch, getState) => {
        dispatch(deleteClientsRequest());
        axios.delete("/stockOwners/?namesToDelete=" + clientNamesList)
            .then(response => {
                dispatch(deleteClientsSuccess());
                dispatch(
                    getClientList(getState().clientListReducer.page.activePage,
                    getState().clientListReducer.page.itemsCountPerPage));
            })
            .catch(error => dispatch(deleteClientFail()))
    }
};

export default {
    getClientList,
    deleteClients,
    showDialog,
    closeDialog
}