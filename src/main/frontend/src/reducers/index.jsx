import {combineReducers} from 'redux'
import {reducer as FormReducer} from 'redux-form'
import {client} from "../containers/editClient";

const rootReducer = combineReducers({
    form: FormReducer,
    client
});

export default rootReducer
