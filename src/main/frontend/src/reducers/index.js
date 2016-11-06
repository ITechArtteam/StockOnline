import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";
import {clientListReducer} from '../containers/systemClients/index';

const rootReducer = combineReducers({
    form: FormReducer,
    client, clientListReducer
});

export default rootReducer
