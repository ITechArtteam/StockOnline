import * as event from "./constants";

const initUserState = {
    data: {

    },
    inputErrors: {

    },
    frontend: {
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка"
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {

        case event.GET_CLIENT_REQUEST:
            return {
                ...state, frontend: {
                    ...state.frontend, showAlertPopup: false
                }
            };

        default:
            return state;
    }
}


