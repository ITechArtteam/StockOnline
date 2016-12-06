import * as types from "../actions/action-types";
import _ from "lodash";

const initialState = {
        response: null,
        acts: [],
    }
    ;

const actsReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ACTS_SUCCESS:
            return Object.assign({}, state, {acts: action.acts});

        case types.DELETE_ACT_SUCCESS:
            var newActs = _.filter(state.acts, acts => act.id != action.id);
            return Object.assign({}, state, {acts: newActs, response: action.response});

        case types.GET_ACTS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_ACTS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response, acts:[]});

        case types.DELETE_ACTS_SUCCESS:
            var newActs= _.differenceWith(state.acts, action.ids, (act, id)=>{return act.id==id});
            return Object.assign({}, state, {acts: newActs, response: action.response});

        case types.POST_ACT_SUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.CLOSE_ACTS_RESPONSE:
            return Object.assign({}, state, {response: null});


        case types.INITIAL_STATE_ACTS:
            return Object.assign({}, state, initialState);
    }
    return state;
}

export default actsReducer;
