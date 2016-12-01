import * as types from "../actions/action-types";
import _ from "lodash";

const initialState = {
        response: null,
        workers: [],
    }
    ;

const workersReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_WORKERS_SUCCESS:
            return Object.assign({}, state, {workers: action.workers});

        case types.DELETE_WORKER_SUCCESS:
            var newWorkers = _.filter(state.workers, worker => worker.id != action.id);
            return Object.assign({}, state, {workers: newWorkers, response: action.response});

        case types.GET_WORKERS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_WORKERS_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_WORKERS_SUCCESS:
            console.log(state.workers);
            console.log(action.ids);
            var newWorkers = _.differenceWith(state.workers, action.ids, (worker, id)=>{return worker.id==id});
            console.log(newWorkers);
            return Object.assign({}, state, {workers: newWorkers, response: action.response});

        case types.POST_WORKER_SUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.CLOSE_WORKERS_RESPONSE:
            return Object.assign({}, state, {response: null});
    }
    return state;
}

export default workersReducer;
