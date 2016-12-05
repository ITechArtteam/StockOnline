import { AUTH_USER, AUTH_ERROR } from '../actions'

const initialState = {
    authenticated: false,
    username: "GUEST",
    roles: ["ROLE_GUEST"],
    error: null
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                username: action.username,
                roles: action.roles,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                ...initialState,
                error: action.error
            };
        default:
            return state;
    }
}