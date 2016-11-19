import * as event from "./constants";

function setActiveNavigationButton(refPath) {
    return {
        type: event.SET_ACTIVE_NAVIGATION_BUTTON,
        data: {
            refPath
        }
    }
}

export default {
    setActiveNavigationButton
};
