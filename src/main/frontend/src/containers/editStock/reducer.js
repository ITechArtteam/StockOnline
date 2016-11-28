import * as event from "./constants";

const initUserState = {
    data: {
        name: "",
        country: "",
        city: "",
        street: "",
        home: "",
        id: -1
    },
    inputErrors: {
        name: "",
        country: "",
        city: "",
        street: "",
        home: ""
    },
    frontend: {
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка"
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {
        case event.ADD_STOCK_REQUEST:
            return {
                ...state
            };
        case event.ADD_STOCK_SUCCESS:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "success", messageAlertPop: "Склад сохранен."
                },
                data: {
                    ...state.data,
                    id: action.data
                }
            };
        case event.ADD_STOCK_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "danger", messageAlertPop: "Склад не сохранен."
                }, inputErrors: action.data
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
        case event.GET_STOCK_REQUEST:
            return {
                ...state
            };
        case event.GET_STOCK_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case event.GET_STOCK_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "danger", messageAlertPop: action.data
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
        case event.SET_DEFAULT_VALUE:
            return initUserState;
        default:
            return state;
    }
}


