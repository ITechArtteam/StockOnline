import * as types from "../actions/action-types";
import _ from "lodash";

const initialState = {
        message: null,
        workers: [],
        worker: {
            id: "",
            name: "",
            surname: "",
            address: {
                cityName: "",
                countryName: "",
                home: "",
                room: "",
                street: "",
            },
            birthday: "",
            email: "",
            login: "",
            password: "",
            patronymic: "",
            roles: [],
        }

    }
    ;

const workerReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_WORKERS_SUCCESS:
            return Object.assign({}, state, {workers: action.workers});

        case types.DELETE_WORKER_SUCCESS:
            const newWorkers = _.filter(state.workers, worker => worker.id != action.id);
            return Object.assign({}, state, {workers: newWorkers, message:action.message});

        case types.GET_WORKER_SUCCESS:
            return Object.assign({}, state, {worker: action.worker});

        case types.GET_WORKERS_UNSUCCESS:
            return Object.assign({}, state, {message: action.message});

        case types.GET_WORKER_UNSUCCESS:
            return Object.assign({}, state, {message: action.message});

        case types.DELETE_WORKER_UNSUCCESS:
            return Object.assign({}, state, {message: action.message});

        case types.POST_WORKER_SUCCESS:
            return Object.assign({}, state, {message: action.message});

        case types.POST_WORKER_UNSUCCESS:
            return Object.assign({}, state, {message: action.message});
    }
    return state;
}

export default workerReducer;

