import axios from "axios";
import store from '../store/configureStore'
import {getRolesSuccess} from "../actions/role-actions"

export function getRoles() {
    return axios.get('/api/roles')
        .then(response => {
            store.dispatch(getRolesSuccess(response.data));
            return response;
        }).catch(error=> {
        });
}

export function getRolesWithoutSuperAdmin() {
    return axios.get('/api/roles_without_super_admin')
        .then(response => {
            store.dispatch(getRolesSuccess(response.data));
            return response;
        }).catch(error=> {
        });
}