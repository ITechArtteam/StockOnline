import {createStore, compose, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "../reducers";
import createLogger from "redux-logger";

var store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk),
        applyMiddleware(createLogger())
    )
)
export default store;