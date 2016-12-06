import * as types from "../actions/action-types";
import _ from "lodash";

const initialState = {
        response: null,
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

        case types.GET_WORKER_SUCCESS:
            return Object.assign({}, state, {worker: action.worker});

        case types.GET_WORKER_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.DELETE_WORKER_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.POST_WORKER_UNSUCCESS:
            return Object.assign({}, state, {response: action.response});

        case types.CLOSE_WORKER_RESPONSE:
            return Object.assign({}, state, {response: null});

        case types.INITIAL_STATE_WORKER:
            return Object.assign({}, state, initialState);
    }
    return state;
}

export default workerReducer;

