import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    workers: [],
    worker:{
        first_name:"",
        second_name:"",
        patronymic:"",
        email:"",
        country:"",
        city:"",
        house:"",
        apartment:"",
        login:"",
        password:""
    }
};

const workerReducer = function(state = initialState, action) {
    console.log(state);
    switch(action.type) {
        case types.GET_WORKERS_SUCCESS:
            return Object.assign({}, state, { workers: action.workers });

        case types.DELETE_WORKER_SUCCESS:
            const newWorkers = _.filter(state.workers, worker => worker.id != action.id);
            return Object.assign({}, state, { workers: newWorkers });

        case types.GET_WORKER_SUCCESS:
            return Object.assign({}, state, { worker: action.worker });
    }
    return state;
}

export default workerReducer;