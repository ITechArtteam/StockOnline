import * as event from "./constants";

const initUserState = {
    data: {
        name: "",
        adminEmail: "",
        adminLogin: "",
        adminPassword: "",
        country: "",
        city: "",
        street: "",
        home: "",
        room: ""
    },
    inputErrors: {
        name: "",
        adminEmail: "",
        adminLogin: "",
        adminPassword: "",
        country: "",
        city: "",
        street: "",
        home: "",
        room: ""
    },
    frontend: {
        adminPasswordVisibility: true,
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка",
        isFetch: false,
        isFail: false,
        error: ""
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {
        case event.ADD_CLIENT_REQUEST:
            return {
                ...state
            };
        case event.ADD_CLIENT_SUCCESS:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, type: "success", messageAlertPop: "Клиен сохранен."
                }
            };
        case event.ADD_CLIENT_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, type: "danger", messageAlertPop: "Произошла ошибка."
                }
            };
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
        case event.GET_CLIENT_REQUEST:
            return {
                ...state
            };
        case event.GET_CLIENT_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case event.GET_CLIENT_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, type: "danger", messageAlertPop: "Клиент не найден."
                }
            };
        case event.SET_VISIBILITY_PASSWORD:
            return {
                ...state, frontend: {
                    ...state.frontend, [action.data.nameField]: !state.frontend[action.data.nameField]
                }
            };
        case event.SHOW_ALERT_POPUP:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, type: action.data.type, messageAlertPop: action.data.message
                }
            };
        case event.CLOSE_ALERT_POPUP:
            return {
                ...state, frontend: {
                    ...state.frontend, showAlertPopup: false
                }
            };
        default:
            return state;
    }
}


