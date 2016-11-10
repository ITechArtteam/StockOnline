import { browserHistory } from 'react-router'

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export function signInUser(credentials) {
    return function (dispatch) {
        $.ajax({
            type: 'POST',
            url: '/login',
            data: `username=${credentials.username}&password=${credentials.password}`,
            success: function () {
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: `/userinfo/${credentials.username}`,
                    success: function (response) {
                        dispatch(authUser(response));
                        browserHistory.push('/clients');
                    },
                    error: function () {
                        dispatch(authError())
                    }
                })
            }
        })
    }
}

export function authUser(userInfo) {
    return {
        type: AUTH_USER,
        username: userInfo.username,
        roles: userInfo.roles
    }
}

export function authError() {
    return {
        type: AUTH_ERROR
    }
}
