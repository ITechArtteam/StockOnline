import axios from 'axios';
import store from '../store/configureStore'
import {browserHistory} from 'react-router';
import { getActSuccess, saveActUnsuccess, deleteActUnsuccess, closeActResponse } from '../actions/act-actions';
import { getActsUnsuccess, deleteActSuccess, saveActSuccess} from '../actions/acts-actions';


export function getAct(id, thenRedirectPath, errorRedirectPath) {
    return axios.get('/api/act/'+id)
        .then(response => {
            store.dispatch(getActSuccess(response.data));
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(getActsUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function deleteAct(id, thenRedirectPath, errorRedirectPath) {
    return axios.delete('/api/act/' + id)
        .then(response => {
            store.dispatch(deleteActSuccess(id, response));
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(deleteActUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function saveAct(worker, thenRedirectPath, errorRedirectPath) {
    console.log(worker)
    return axios.post('/api/act/', worker)
        .then(response => {
            store.dispatch(saveActSuccess(response.data,response))
            redirect(thenRedirectPath);
        }).catch(error=>{
            store.dispatch(saveActUnsuccess(error.response))
            redirect(errorRedirectPath);
        });
}

export function closeResponse(){
    store.dispatch(closeActResponse());
}

function redirect(path){
    if (path!==null && path!==undefined){
        browserHistory.push(path);
    }
}
