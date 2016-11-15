import {combineReducers} from "redux";
import {reducer as FormReducer} from "redux-form";
import {client} from "../containers/editClient";
import {clientListReducer} from "../containers/systemClients/index";
import {stockListReducer} from "../containers/stocks/index";
import workerReducer from "./worker-reducer";

const rootReducer = combineReducers({
    workerState:workerReducer,
    form: FormReducer,
    client,
    clientListReducer,
    stockListReducer,
});

export default rootReducer
