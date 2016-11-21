import * as event from './constants'
import * as axios from "axios";

var findWaybillRequest = () => {
    return {
        type: event.FIND_WAYBILL_BY_ID_REQUEST
    }
};

var findWaybillSuccess = json => {
    return {
        type: event.FIND_WAYBILL_BY_ID_SUCCESS,
        payload: json
    }
};

var findWaybillFail = error => {
    return {
        type: event.FIND_WAYBILL_BY_ID_FAIL,
        payload: error
    }
};

var findWaybillById = id => {
    return dispatch => {
        dispatch(findWaybillRequest());
        axios.get(`waybills/${id}`)
            .then(response => dispatch(findWaybillSuccess(response.data)))
            .catch(error => dispatch(findWaybillFail(error)))
    }
};

export default {
    findWaybillById
}
