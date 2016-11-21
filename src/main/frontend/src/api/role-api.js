import axios from "axios";
import store from '../store/configureStore'
import {getRolesSuccess} from "../actions/role-actions"

export function getRoles() {
    console.log("etRoles")
    return axios.get('/api/roles')
        .then(response => {
            store.dispatch(getRolesSuccess(response.data));
            console.log(response.date)
            return response;
        }).catch(error=> {
        });
}