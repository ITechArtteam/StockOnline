import * as event from "./constants";

const initUserState = {

    data: {
        stockRooms: {
            selectedRoomName: null,
            rooms: [],
            addRoomModalForm: {
                isOpen: false,
                number: '',
                cost: '',
                storage: '',
                id: -1
            }
        },
        name: "",
        country: "",
        city: "",
        street: "",
        home: "",
        id: -1
    },

    inputErrors: {
        name: "",
        country: "",
        city: "",
        street: "",
        home: ""
    },
    frontend: {
        showAlertPopup: false,
        typeAlertPopup: "danger",
        messageAlertPop: "ошибка"
    }
};

export default function (state = initUserState, action) {
    switch (action.type) {
        case event.ADD_STOCK_REQUEST:
            return {
                ...state
            };
        case event.ADD_STOCK_SUCCESS:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "success", messageAlertPop: "Склад сохранен."
                },
                data: {
                    ...state.data,
                    id: action.data
                }
            };
        case event.ADD_STOCK_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "danger", messageAlertPop: "Склад не сохранен."
                }, inputErrors: action.data
            };
        case event.SET_FIELD:
            return {
                ...state, data: {
                    ...state.data, [action.data.nameField]: action.data.value
                }
            };
        case event.SET_INPUT_ERROR_MESSAGE:
            return {
                ...state, inputErrors: {
                    ...state.inputErrors, [action.data.nameField]: action.data.message
                }
            };
        case event.GET_STOCK_REQUEST:
            return {
                ...state
            };
        case event.GET_STOCK_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case event.GET_STOCK_FAIL:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: "danger", messageAlertPop: action.data
                }
            };
        case event.SHOW_ALERT_POPUP:
            return {
                ...state, frontend: {
                    ...state.frontend,
                    showAlertPopup: true, typeAlertPopup: action.data.type, messageAlertPop: action.data.message
                }
            };
        case event.CLOSE_ALERT_POPUP:
            return {
                ...state, frontend: {
                    ...state.frontend, showAlertPopup: false
                }
            };
        case event.SET_DEFAULT_VALUE:
            return initUserState;

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CHANGE_NUMBER:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            number: action.number
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CHANGE_COST:
            return {
                ...state,
                data: {
                    ...state.data, stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            cost: action.cost
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CHANGE_STORAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            storage: action.storage
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CLEAR_FIELDS:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            number: '',
                            cost: '',
                            storage: ''
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_DELETE_ROOM:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        rooms: state.data.stockRooms.rooms.filter(function (room) {
                            return room.number !== action.number
                        })
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        rooms: [
                            ...state.data.stockRooms.rooms,
                            action.room
                        ]
                    }
                }
            };

        case event.EDIT_STOCK_FORM_SELECT_ROOM:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        selectedRoomName: action.number
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_HIDE:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            isOpen: false
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SHOW:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            isOpen: true
                        }
                    }
                }
            };

        default:
            return state;
    }
}


