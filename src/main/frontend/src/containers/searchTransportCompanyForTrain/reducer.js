import * as event from "./constants";

const initUserState = {
    data: {
        transferCompanyName: ""
    },
    inputErrors: {
        transferCompanyName: ""
    },
    frontend: {
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка",
        buttons: []
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {

        case event.SET_FIELD:
            return {
                ...state, data: {
                    ...state.data, transferCompanyName: action.data.value
                }
            };
        case event.SHOW_ALERT_POPUP:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: action.data.type, messageAlertPop: action.data.message
                }
            };
        case event.CLOSE_ALERT_POPUP:
            return {
                ...state, frontend: {
                    ...state.frontend, showAlertPopup: false
                }
            };
        case event.SET_INPUT_ERROR_MESSAGE:
            return {
                ...state, inputErrors: {
                    ...state.inputErrors, [action.data.nameField]: action.data.message
                }
            };
        case event.GET_TRAIN_REQUEST:
            return state;
        case event.GET_TRAIN_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data, ...action.data
                }
            };
        case event.GET_TRAIN_FAIL:
            return {
                ...state, frontend: action.data,
                inputErrors: action.data
            };
        case event.SET_DEFAULT_VALUE:
            return initUserState;
        default:
            return state;
    }
}


