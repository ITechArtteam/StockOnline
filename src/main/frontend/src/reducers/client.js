import * as event from "../constants/client";

const initUserState = {
    client: {
        companyName: "",
        adminLogin: "",
        adminPassword: "",
        bossLogin: "",
        bossPassword: "",
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

function client(state = initUserState, action) {
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
                client: action.json
            };
        case event.ADD_CLIENT_FAIL:
            return {
                ...state,
                frontend: {isFetch: false, isFail: true, error: action.error}
            };
        case event.SET_FIELD:
            return {
                ...state, client: {
                    ...state.client, [action.data.nameField]: action.data.value
                }
            };
        default:
            return state;
    }
}


export default client;