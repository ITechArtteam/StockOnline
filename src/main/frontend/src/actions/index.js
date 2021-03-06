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
                                browserHistory.push('/goods/departure');
                                break;
                            case "CONTROLLER":
                                browserHistory.push('/goods/checkInput');
                                break;
                            case "BOSS_STOCK":
                                browserHistory.push('/goods');
                                break;
                            default:
                                browserHistory.push('/login');
                                break;
                        }
                    },
                    error: function (error) {
                        if (400 === error.status){
                            dispatch(authError('Ваша компания заблокирована.'));
                        } else {
                            dispatch(authError('Указанная комбинация логина и пароля не найдена'));
                        }
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
        roles: userInfo.roles,
        id: userInfo.id,
        idCompany:userInfo.idCompany
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        error
    }
}
