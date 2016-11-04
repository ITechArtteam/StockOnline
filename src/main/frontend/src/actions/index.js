export const SIGN_IN_USER = 'SIGN_IN_USER';

export function signInUser(credentials) {
    return function (dispatch) {
        alert(JSON.stringify(credentials));
    }
}

export {client} from "../containers/editClient";
