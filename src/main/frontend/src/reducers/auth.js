import { AUTH_USER, AUTH_ERROR } from '../actions'

const initialState = {
    authenticated: false,
    username: "GUEST",
    role: "GUEST"
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                username: action.username,
                role: action.role
            };
        case AUTH_ERROR:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}