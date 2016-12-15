import axios from "axios";
import store from '../store/configureStore'
import {getRolesSuccess,getRolesUnsuccess, clearRoleReducer} from "../actions/role-actions"

export function getRoles() {
    return axios.get('/api/roles')
        .then(response => {
            store.dispatch(getRolesSuccess(response.data));
            return response;
        }).catch(error=> {
            store.dispatch(getRolesUnsuccess({
                type: "danger",
                title: "Ошибка 500.Ошибка на сервере",
                text: ["Информация об ошибке отправлены разработчикам."],
            }));
        });
}

export function getRolesWithoutSuperAdmin() {
    return axios.get('/api/roles_without_super_admin')
        .then(response => {
            store.dispatch(getRolesSuccess(response.data));
            return response;
        }).catch(error=> {
            store.dispatch(getRolesUnsuccess({
                type: "danger",
                title: "Ошибка 500.Не удалось получить роли.",
                text: ["Информация об ошибке отправлены разработчикам."],
            }));
        });
}



export function clearReducer() {
    store.dispatch(clearRoleReducer());
}