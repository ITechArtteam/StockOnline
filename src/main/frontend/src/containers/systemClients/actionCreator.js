import * as event from './constants'
import * as axios from "axios";


let setFilterMessageVisibility = visibility => {
    return {
        type: event.SET_FILTER_MESSAGE_VISIBILITY,
        payload: visibility
    }
};

let getClientListRequest = () => {
    return {
        type: event.GET_CLIENT_LIST_REQUEST
    }
};

let getClientListSuccess = json => {
    return {
        type: event.GET_CLIENT_LIST_SUCCESS,
        payload: json
    }
};

let getClientList = (pageNumber, itemsCountPerPage) => {
    return (dispatch, getState) => {
        dispatch(getClientListRequest());
        let status = getState().clientListReducer.frontend.statusRadioValue;
        let name = getState().clientListReducer.frontend.filterCompanyNameValue;
        let address = getState().clientListReducer.frontend.filterAddressValue;

        let visibility = (status !== '2' || name !== '' || address !== '');
        dispatch(setFilterMessageVisibility(visibility));
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
            .catch(error => dispatch(showDialog(`Произошла ошибка при получении списка клиентов.`, 'danger', [])))
    }
};

let showDialog = (text, type, buttons) => {
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

let closeDialog = () => {
    return {
        type: event.CLOSE_DIALOG
    }
};

let deleteClientsRequest = () => {
    return {
        type: event.DELETE_CLIENT_LIST_REQUEST
    }
};

let deleteClients = clientNamesList => {
    return (dispatch, getState) => {
        dispatch(deleteClientsRequest());
        axios.delete('/stockOwners/',
            {
                params: {
                    namesToDelete: clientNamesList.join()
                }
            })
            .then(response => {
                dispatch(showDialog(response.data, '', []));
                dispatch(
                    getClientList(1, getState().clientListReducer.page.itemsCountPerPage));
            })
            .catch(error => dispatch(showDialog(`Произошла ошибка при изменении статуса компании. ${error}`, 'danger', [])))
    }
};

let setStatusRadioValue = value => {
    return {
        type: event.FORM_CLIENTS_SET_STATUS_RADIO,
        payload: value
    }
};

let setFilterInputValue = (inputId, value) => {
    return {
        type: event.SET_FILTER_INPUT_VALUE,
        payload: {
            inputId: inputId,
            value: value
        }
    }
};

let setDefaultState = () => {
    return {
        type: event.SET_DEFAULT_STATE
    }
};

export default {
    getClientList,
    deleteClients,
    showDialog,
    closeDialog,
    setStatusRadioValue,
    setFilterInputValue,
    setDefaultState
}