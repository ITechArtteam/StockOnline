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
<<<<<<< HEAD
                        switch (response.roles[0]) {
                            case 'DISPATCHER':
                                browserHistory.push('/waybills');
                                break;
                            default:
                                browserHistory.push('/clients');
                                break;
=======
                        switch(response.roles[0]) {
                            case "SUPER_ADMIN":
                                browserHistory.push('/clients');
                                break;
                            case "ADMIN":
                                browserHistory.push('/stocks');
                                break;
                            case "DISPATCHER":
                                browserHistory.push('/registrationOfGoods');
                                break;
                            case "MANAGER":
                                browserHistory.push('/goods/receipt');
                                break;
                            case "CONTROLLER":
                                browserHistory.push('/goods/checkInput');
                                break;
                            case "BOSS_STOCK":
                                browserHistory.push('/goods');
                                break;
>>>>>>> c66abaeab5d105f677927d7741eb7adee1e04a71
                        }
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
