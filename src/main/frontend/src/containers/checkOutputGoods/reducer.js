import * as event from './constants'

var initOutputGoodsState = {
    waybill: {
        id: 123,
        status: 0,
        productInWaybills: [
            {
                count: 10,
                product: {
                    name: 'Яблоко',
                    storage: {
                        type: 'Нет требований'
                    }
                }
            },
            {
                count: 20,
                product: {
                    name: 'Груша',
                    storage: {
                        type: 'Нет требований'
                    }
                }
            }],
        transport: {
            type: 1,
            number: 'AC 2013',
            storage: {
                type: 'Нет требований'
            }
        }
    }
};

export default (state = initOutputGoodsState, action) => {
    switch (action.type) {
        case event.FIND_WAYBILL_BY_ID_REQUEST:
            return state;
        case event.FIND_WAYBILL_BY_ID_SUCCESS:
            return {
                ...state, waybill: action.payload
            };
        default:
            return state;
    }
}