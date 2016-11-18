import * as event from "./constants";

const initUserState = {
    frontend: {
        activeNavigationButton: "Войти"
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {
        case event.SET_ACTIVE_NAVIGATION_BUTTON:
            return {
                ...state, frontend: {
                    ...state.frontend, activeNavigationButton: action.data.buttonText
                }
            };
        default:
            return state;
    }
}


