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

var getClientList = (pageNumber, itemsCountPerPage) => {
    return (dispatch, getState) => {
        dispatch(getClientListRequest());
        var status = getState().clientListReducer.frontend.statusRadioValue;
        var name = getState().clientListReducer.frontend.filterCompanyNameValue;
        var address = getState().clientListReducer.frontend.filterAddressValue;
        return axios
            .get(`/stockOwners/page/${pageNumber}/limit/${itemsCountPerPage}`,
                {
                    params: {
                        name: name,
                        address: address,
                        status: status
                    }
                })
            .then(response => dispatch(getClientListSuccess(response.data)))
            .catch(error => dispatch(showDialog(`Произошла ошибка при получении списка клиентов.${error}`, 'danger', [])))
    }
};

var showDialog = (text, type, buttons) => {
    return {
        type: event.SHOW_DIALOG,
        payload: {
            isVisible: true,
            text: text,
            buttons: buttons,
            type: type
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

var deleteClients = clientNamesList => {
    return (dispatch, getState) => {
        dispatch(deleteClientsRequest());
        axios.delete(`/stockOwners/?namesToDelete=${clientNamesList}`)
            .then(response => {
                dispatch(showDialog("Удаление успешно.", '', []));
                dispatch(
                    getClientList(1, getState().clientListReducer.page.itemsCountPerPage));
            })
            .catch(error => dispatch(showDialog(`Произошла ошибка при удалении. ${error}`, 'danger', [])))
    }
};

var setStatusRadioValue = value => {
    return {
        type: event.FORM_CLIENTS_SET_STATUS_RADIO,
        payload: value
    }
};

var setFilterInputValue = (inputId, value) => {
    return {
        type: event.SET_FILTER_INPUT_VALUE,
        payload: {
            inputId: inputId,
            value: value
        }
    }

};

export default {
    getClientList,
    deleteClients,
    showDialog,
    closeDialog,
    setStatusRadioValue,
    setFilterInputValue
}