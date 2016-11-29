import * as Actions from './actions'

const initialState = {
    number: '',
    registrationDate: null,
    senderName: '',
    sender: null,
    selectSenderModalForm: {
        isOpen: false,
        selectedSenderName: null,
        senders: []
    },
    carrierName: '',
    carrier: null,
    selectCarrierModalForm: {
        isOpen: false,
        selectedCarrierName: null,
        carriers: []
    },
    transportNumbers: {
        addNumberModalForm: {
            isOpen: false,
            number: ''
        },
        numbers: [],
        car: '',
        trailer: '',
        selectedNumber: null
    },
    driver: {
        id: 1,
        firstName: 'TEST_DRIVER_FIRSTNAME',
        lastName: 'TEST_DRIVER_LASTNAME',
        patronymic: 'TEST_DRIVER_PATRONYMIC',
        passportNumber: 'zx500'
    },
    description: '',
    waybillProducts: {
        selectedProductName: null,
        products: [],
        addProductModalForm: {
            isOpen: false,
            name: '',
            price: '',
            count: '',
            storage: ''
        }
    },
    transportTypes: [
        {
            value: 'AUTO', label: 'Автомобиль'
        },
        {
            value: 'TRAIN', label: 'Поезд'
        }
    ],
    transportType: null,
    selectSenderModal: {
        senders: [],
        selectedSender: null
    }
};

export default function waybillRegistrationForm(state = initialState, action) {

    switch (action.type) {

        case Actions.CHANGE_WAYBILL_SENDER_NAME:
            return {
                ...state,
                number: action.senderName
            };

        case Actions.CHANGE_WAYBILL_NUMBER:
            return {
                ...state,
                number: action.number
            };

        case Actions.HIDE_CHOOSE_SENDER_MODAL:
            return {
                ...state,
                selectSenderModalForm: {
                    ...state.selectSenderModalForm,
                    isOpen: false
                }
            };

        case Actions.SHOW_CHOOSE_SENDER_MODAL:
            return {
                ...state,
                selectSenderModalForm: {
                    ...state.selectSenderModalForm,
                    isOpen: true
                }
            };

        case Actions.EDIT_WAYBILL_FORM_SELECT_TRANSPORT_TYPE:
            return {
                ...state,
                transportType: action.transportType
            };

        case Actions.CHOOSE_SENDER_MODAL_LOAD_SENDERS:
            return {
                ...state,
                senders: action.senders
            };

        case Actions.CHOOSE_SENDER_MODAL_SELECT_SENDER:
            return {
                ...state,
                selectedSender: action.selectedSender
            };

        case Actions.EDIT_WAYBILL_FORM_SHOW_CHOOSE_CARRIER_MODAL_FORM:
            return {
                ...state,
                selectCarrierModalForm: {
                    ...state.selectCarrierModalForm,
                    isOpen: true
                }
            };

        case Actions.EDIT_WAYBILL_FORM_HIDE_CHOOSE_CARRIER_MODAL_FORM:
            return {
                ...state,
                selectCarrierModalForm: {
                    ...state.selectCarrierModalForm,
                    isOpen: false
                }
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_WAYBILL_DESCRIPTION:
            return {
                ...state,
                description: action.description
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_REGISTRATION_DATE:
            return {
                ...state,
                registrationDate: action.date
            };

        case Actions.EDIT_WAYBILL_FORM_SELECT_CARRIER:
            return {
                ...state,
                selectCarrierModalForm: {
                    ...state.selectCarrierModalForm,
                    selectedCarrierName: action.carrier
                }
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_CAR_NUMBER:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    car: action.number
                }
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_TRAILER_NUMBER:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    trailer: action.number
                }
            };

        case Actions.EDIT_WAYBILL_FORM_SELECT_NUMBER:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    selectedNumber: action.number
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_CHANGE_NUMBER:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    addNumberModalForm: {
                        ...state.transportNumbers.addNumberModalForm,
                        number: action.number
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_SHOW: {
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    addNumberModalForm: {
                        ...state.transportNumbers.addNumberModalForm,
                        isOpen: true
                    }
                }
            };
        }

        case Actions.EDIT_WAYBILL_FORM_ADD_NUMBER_MODAL_FORM_HIDE:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    addNumberModalForm: {
                        ...state.transportNumbers.addNumberModalForm,
                        isOpen: false
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_NUMBER:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    numbers: [...state.transportNumbers.numbers, action.number]
                }
            };

        case Actions.EDIT_WAYBILL_FORM_DELETE_NUMBER:
            return {
                ...state,
                transportNumbers: {
                    ...state.transportNumbers,
                    numbers: state.transportNumbers.numbers.filter(function(number) {
                        return number.number !== action.number;
                    })
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_SHOW:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        isOpen: true
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_HIDE:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        isOpen: false
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_SELECT_PRODUCT:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    selectedProductName: action.productName
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    products: [
                        ...state.waybillProducts.products,
                        action.product
                    ]
                }
            };

        case Actions.EDIT_WAYBILL_FORM_DELETE_PRODUCT:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    products: state.waybillProducts.products.filter(function(product) {
                        return product.name !== action.productName
                    })
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_NAME:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        name: action.name
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_PRICE:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        price: action.price
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_COUNT:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        count: action.count
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CHANGE_STORAGE:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        storage: action.storage
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_ADD_PRODUCT_MODAL_FORM_CLEAR_FIELDS:
            return {
                ...state,
                waybillProducts: {
                    ...state.waybillProducts,
                    addProductModalForm: {
                        ...state.waybillProducts.addProductModalForm,
                        name: '',
                        price: '',
                        count: '',
                        storage: ''
                    }
                }
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_SENDER_NAME:
            return {
                ...state,
                senderName: action.name
            };

        case Actions.EDIT_WAYBILL_FORM_CHANGE_CARRIER_NAME:
            return {
                ...state,
                carrierName: action.name
            };

        case Actions.EDIT_WAYBILL_FORM_SET_DRIVER_INFO:
            return {
                ...state,
                driver: action.driverInfo
            };

        case Actions.EDIT_WAYBILL_FORM_SET_CARRIERS:
            return {
                ...state,
                selectCarrierModalForm: {
                    ...state.selectCarrierModalForm,
                    carriers: action.carriers
                }
            };

        case Actions.EDIT_WAYBILL_FORM_SET_SENDERS:
            return {
                ...state,
                selectSenderModalForm: {
                    ...state.selectSenderModalForm,
                    senders: action.senders
                }
            };

        case Actions.EDIT_WAYBILL_FORM_SELECT_SENDER:
            return {
                ...state,
                selectSenderModalForm: {
                    ...state.selectSenderModalForm,
                    selectedSenderName: action.sender
                }
            };

        case Actions.EDIT_WAYBILL_FORM_SET_SENDER:
            return {
                ...state,
                sender: action.sender
            };

        case Actions.EDIT_WAYBILL_FORM_SET_CARRIER:
            return {
                ...state,
                carrier: action.carrier
            };


        default:
            return state;
    }
}