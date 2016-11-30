import * as event from "./constants";

const initUserState = {

    data: {
        transferCompany: "",
        passportNumber: "",
        passportIssuedBy: "",
        passportIssuedDate: "",
        firstName: "",
        lastName: "",
        fatherName: "",
        birthDate: "",
        id: -1
    },

    inputErrors: {
        transferCompany: "",
        passportNumber: "",
        passportIssuedBy: "",
        passportIssuedDate: "",
        firstName: "",
        lastName: "",
        fatherName: "",
        birthDate: ""
    },
    frontend: {
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка"
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {
        case event.EDIT_DRIVER_CHANGE_BIRTH_DATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    birthDate: action.date
                }
            };
        case event.EDIT_DRIVER_CHANGE_PASSPORT_ISSUED_DATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    passportIssuedDate: action.date
                }
            };
        case event.ADD_DRIVER_REQUEST:
            return {
                ...state
            };
        case event.ADD_DRIVER_SUCCESS:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "success", messageAlertPop: "Водитель сохранен."
                },
                data: {
                    ...state.data,
                    id: action.data
                }
            };
        case event.ADD_DRIVER_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "danger", messageAlertPop: "Водетель не сохранен."
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
        case event.GET_DRIVER_REQUEST:
            return {
                ...state
            };
        case event.GET_DRIVER_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case event.GET_DRIVER_FAIL:
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


