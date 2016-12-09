import * as types from "../actions/action-types";
import _ from "lodash";

const initialState = {
        response: null,
        acts: [],
        act: {
            id: "",
            reportDate: "",
            products_in_act:[],
            status:"",
            user:{
                id:"",
                login:""
            }
        }

    }
    ;
const initialAct ={
    id: "",
    reportDate: "",
    products_in_act:[],
    status:"",
    user:{
        id:"",
        login:""
    }
}

const actsReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ACTS_SUCCESS:
            return Object.assign({}, state, {acts: action.acts});



        case types.GET_ACTS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_ACTS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, acts:[]});

        case types.DELETE_ACTS_SUCCESS:
            var newActs= _.differenceWith(state.acts, action.ids, (act, id)=>{return act.id==id});
            return Object.assign({}, state, {acts: newActs, response: action.response});

        
        case types.POST_ACT_SUCCESS:
            var newActs = _.concat(state.acts, action.act);
            return Object.assign({}, state, {acts: newActs, response: action.response});

        case types.DELETE_ACT_SUCCESS:
            var newActs = _.filter(state.acts, acts => act.id != action.id);
            return Object.assign({}, state, {acts: newActs, response: action.response});

        case types.FIND_ACT_IN_STORE:
            var newAct =  state.acts[id];
            return Object.assign({}, state, {act: newAct});



        case types.CLOSE_ACTS_RESPONSE:
            return Object.assign({}, state, {response: null});
        case types.INITIAL_STATE_ACTS:
            return Object.assign({}, state, initialState);



        case types.GET_ACT_SUCCESS:
            return Object.assign({}, state, {act: action.act});

        case types.GET_ACT_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_ACT_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.POST_ACT_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, act: action.act});

        case types.INITIAL_STATE_ACT:
            return Object.assign({}, state, {act:initialAct});
    }
    return state;
}

export default actsReducer;
