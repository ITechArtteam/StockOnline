import * as event from "./constants";

const initUserState = {
    data: {
        searchNumber: "",
        name: "",
        surname: "",
        patronymic: "",
        birthday: "",
        issued_by: "",
        issued_date: "",
        id: "-1"
    },
    inputErrors: {
        searchNumber: ""
    },
    frontend: {
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка",
        isActiveNextButton: false
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {

        case event.SET_FIELD:
            return {
                ...state, data: {
                    ...state.data, [action.data.nameField]: action.data.value
                }
            };
        case event.SET_INPUT_ERROR_MESSAGE:
            return {
                ...state, inputErrors: {
                    ...state.inputErrors, [action.data.nameField]: action.data.message
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
        case event.GET_DRIVER_REQUEST:
            return state;
        case event.GET_DRIVER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data, ...action.data
                }
            };
        case event.GET_DRIVER_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "danger", messageAlertPop: action.data
                }
            };
        case event.SET_DEFAULT_VALUE:
            return initUserState;
        case event.ENABLE_NEXT_BUTTON:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    isActiveNextButton: true
                }
            };
        case event.DISABLE_NEXT_BUTTON:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    isActiveNextButton: false
                }
            };
        default:
            return state;
    }
}


