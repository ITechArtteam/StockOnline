import * as event from "./constants";

function setActiveNavigationButton(buttonText) {
    return {
        type: event.SET_ACTIVE_NAVIGATION_BUTTON,
        data: {
            buttonText
        }
    }
}

export default {
    setActiveNavigationButton
};
