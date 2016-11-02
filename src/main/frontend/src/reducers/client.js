import {SET_TEXT} from "../constants/client";
import {combineReducers} from 'redux'
const initialState = "Hello world";


function setText(state = initialState, action) {
    switch (action.type){
        case SET_TEXT:
            return action.text;
        default:
            return state;
    }
}

const initUserState = {
    initUserState: false,
    didInvalidate: false,
    msg: ""
};

function clientReducer(state = initUserState, action){
    switch (action.type){
        default:
            return state;
    }
}



const client = combineReducers({
    text: setText,
    clientReducer
});

export default client;