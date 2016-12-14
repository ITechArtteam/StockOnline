import * as event from "./constants";

const initUserState = {

    data: {
        stockRooms: {
            selectedRoomName: null,
            rooms: [],
            validationErrors: {
                roomsError: '',
                numberError: '',
                costError: '',
                storageError: ''
            },
            addRoomModalForm: {
                isOpen: false,
                number: '',
                cost: '',
                storage: '',
                idRoom: -1,
                selectedShelfName: null,
                shelfs: [],
                addShelfModalForm: {
                    isOpen: false,
                    number: '',
                    capacity: '',
                    isFree: true,
                    idShelf: -1
                }
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
                            storage: '',
                            idRoom: -1,
                            shelfs: []
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

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SELECT_UNIT: {
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            unit: action.unit
                        }
                    }
                }
            }
        };

        case event.EDIT_STOCK_FORM_STOCK_ROOMS_CREATE_ADD_ROOM_MODAL_FORM:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: action.addRoomModalForm
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_CHANGE_NUMBER:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            addShelfModalForm: {
                                ...state.data.stockRooms.addRoomModalForm.addShelfModalForm,
                                number: action.number
                            }
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_CHANGE_CAPACITY:
            return {
                ...state,
                data: {
                    ...state.data, stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            addShelfModalForm: {
                                ...state.data.stockRooms.addRoomModalForm.addShelfModalForm,
                                capacity: action.capacity
                            }
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_SHOW:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            isOpen: true,
                            addShelfModalForm: {
                                ...state.data.stockRooms.addRoomModalForm.addShelfModalForm,
                                isOpen: true
                            }
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_SELECT_UNIT: {
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            addShelfModalForm: {
                                ...state.data.stockRooms.addRoomModalForm.addShelfModalForm,
                                unit: action.unit
                            }
                        }
                    }
                }
            }
        };

        case event.EDIT_STOCK_FORM_SELECT_SHELF:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            selectedShelfName: action.number
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_HIDE:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            isOpen: true,
                            addShelfModalForm: {
                                ...state.data.stockRooms.addRoomModalForm.addShelfModalForm,
                                isOpen: false
                            }
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_CLEAR_FIELDS:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            addShelfModalForm: {
                                ...state.data.stockRooms.addRoomModalForm.addShelfModalForm,
                                number: '',
                                capacity: '',
                                idShelf: -1,
                                isFree: true
                            }
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_DELETE_SHELF:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            shelfs: state.data.stockRooms.addRoomModalForm.shelfs.filter(function (shelf) {
                                return shelf.number !== action.number
                            })
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_SHELF:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        addRoomModalForm: {
                            ...state.data.stockRooms.addRoomModalForm,
                            shelfs: [
                                ...state.data.stockRooms.addRoomModalForm.shelfs,
                                action.shelf
                            ]
                        }
                    }
                }
            };
        case event.EDIT_STOCK_FORM_SET_ROOMS_ERROR:
            return {
                ...state,data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        validationErrors: {
                            ...state.data.stockRooms.validationErrors,
                            roomsError: action.error
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SET_COST_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        validationErrors: {
                            ...state.data.stockRooms.validationErrors,
                            costError: action.error
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SET_NUMBER_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        validationErrors: {
                            ...state.data.stockRooms.validationErrors,
                            numberError: action.error
                        }
                    }
                }
            };

        case event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SET_STORAGE_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    stockRooms: {
                        ...state.data.stockRooms,
                        validationErrors: {
                            ...state.data.stockRooms.validationErrors,
                            storageError: action.error
                        }
                    }
                }
            };

        default:
            return state;
    }
}


