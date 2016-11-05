import * as event from "./constants";

const initUserState = {
    data: {
        name: "",
        adminEmail: "",
        adminLogin: "",
        adminPassword: "",
        adminPasswordVisibility: true,
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
        isFetch: false,
        isFail: false,
        error: ""
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {
        case event.ADD_CLIENT_REQUEST:
            return {
                ...state,
                frontend: {isFetch: true, isFail: false, error: ""}
            };
        case event.ADD_CLIENT_SUCCESS:
            return {
                ...state,
                frontend: {isFetch: false, isFail: false, error: ""},
            };
        case event.ADD_CLIENT_FAIL:
            return {
                ...state,
                frontend: {isFetch: false, isFail: true, error: action.error}
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
                ...state,
                frontend: {isFetch: true, isFail: false, error: ""}
            };
        case event.GET_CLIENT_SUCCESS:
            return {
                ...state,
                frontend: {isFetch: false, isFail: false, error: ""},
                data: action.data
            };
        case event.SET_VISIBILITY_PASSWORD:
            return {
                ...state, data: {
                    ...state.data, [action.data.nameField]: !state.data[action.data.nameField]
                }
            };
        default:
            return state;
    }
}


