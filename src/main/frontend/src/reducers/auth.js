import { AUTH_USER, AUTH_ERROR } from '../actions'

const initialState = {
    authenticated: false,
    id:"",
    username: "GUEST",
    roles: ["ROLE_GUEST"]
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                username: action.username,
                roles: action.roles,
                id: action.id
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