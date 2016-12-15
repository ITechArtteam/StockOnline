import React from 'react'
import { connect } from 'react-redux'
import {stockActionCreator} from "./../../index";

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import TextInput from '../../../../components/TextInput/TextInput'
import Shelfs from './Shelfs'

import {
    checkNumber,
    checkCost,
    checkStorage
} from './validation'

class AddRoomModalForm extends React.Component {


    handleSaveRoom() {
        const errors = this.validateForm();
        if (errors.length < 1) {
            this.props.addRoom({
                number: this.props.number,
                cost: this.props.cost,
                storage: this.props.storage,
                idRoom: this.props.idRoom,
                shelfs: this.props.shelfs
            });
            this.props.hideAddRoomModalForm();
            this.props.clearAddRoomModalFormFields();
        }
    }
    validateForm() {
        let errors = [];
        let error;
        if ((error = this.validateNumber())) {
            if (error != ''){
            errors.push(error);
            }
        }
        if ((error = this.validateCost())) {
            if (error != '') {
                errors.push(error);
            }
        }
        if ((error = this.validateStorage())) {
            if (error != '') {
                errors.push(error);
            }
        }
        return errors;
    }

    validateNumber() {
        const error = checkNumber(this.props.number, this.props.rooms);
        this.props.setRoomNumberError(error);
        return error;
    }

    validateCost() {
        const error = checkCost(this.props.cost);
        this.props.setRoomCostError(error);
        return error;
    }

    validateStorage() {
        const error = checkStorage(this.props.storage);
        this.props.setRoomStorageError(error);
        return error;
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideAddRoomModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideAddRoomModalForm}/>
                    <ModalTitle>Добавить помещение</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Помещение"
                        error={this.props.numberError}
                        value={this.props.number}
                        onChange={this.props.changeRoomNumber}
                        onBlur={() => {this.props.setRoomNumberError(checkNumber(this.props.number, this.props.rooms))}}/>

                    <TextInput
                        label="Стоимость хранения"
                        value={this.props.cost}
                        error={this.props.costError}
                        onChange={this.props.changeRoomCost}
                        onBlur={() => {this.props.setRoomCostError(checkCost(this.props.cost))}}/>
                    <TextInput
                        label="Способ хранения"
                        value={this.props.storage}
                        error={this.props.storageError}
                        onChange={this.props.changeRoomStorage}
                        onBlur={() => {this.props.setRoomStorageError(checkStorage(this.props.storage))}}/>
                    <Shelfs />
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.props.hideAddRoomModalForm} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSaveRoom()}} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        shelfs:  (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.shelfs  : state.stock.data.stockRooms.rooms.shelfs  : [],
        isOpen:  (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.isOpen  : false : false,
        number:  (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.number  : state.stock.data.stockRooms.rooms.number  : '',
        cost:    (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.cost    : state.stock.data.stockRooms.rooms.cost    : '',
        storage: (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.storage : state.stock.data.stockRooms.rooms.storage : '',
        idRoom:  (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.idRoom  : state.stock.data.stockRooms.rooms.idRoom  : -1,
        numberError:  (!!state.stock.data.stockRooms.validationErrors) ? state.stock.data.stockRooms.validationErrors.numberError  : '',
        costError:    (!!state.stock.data.stockRooms.validationErrors) ? state.stock.data.stockRooms.validationErrors.costError    : '',
        storageError: (!!state.stock.data.stockRooms.validationErrors) ? state.stock.data.stockRooms.validationErrors.storageError : '',
        rooms:        (!!state.stock.data.stockRooms) ? state.stock.data.stockRooms.rooms  : [],
        shelfsError: (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.validationErrors) ?  state.stock.data.stockRooms.addRoomModalForm.validationErrors.shelfsError : '' : '' : ''
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addRoom:(room) => {
            dispatch(stockActionCreator.addRoom(room))
        },
        loadUnits: () => {
            dispatch(stockActionCreator.loadUnits())
        },
        clearAddRoomModalFormFields:() => {
            dispatch(stockActionCreator.clearAddRoomModalFormFields())
        },
        hideAddRoomModalForm:() => {
            dispatch(stockActionCreator.hideAddRoomModalForm())
        },
        changeRoomNumber:(number) => {
            dispatch(stockActionCreator.changeRoomNumber(number))
        },
        changeRoomCost:(cost) => {
            dispatch(stockActionCreator.changeRoomCost(cost))
        },
        changeRoomStorage:(storage) => {
            dispatch(stockActionCreator.changeRoomStorage(storage))
        },
        selectRoomUnit:(unit) => {
            dispatch(stockActionCreator.selectRoomUnit(unit))
        },
        setRoomsError:(error) => {
            dispatch(stockActionCreator.setRoomsError(error))
        },
        setRoomCostError:(error) => {
            dispatch(stockActionCreator.setRoomCostError(error))
        },
        setRoomNumberError:(error) => {
            dispatch(stockActionCreator.setRoomNumberError(error))
        },
        setRoomStorageError:(error) => {
            dispatch(stockActionCreator.setRoomStorageError(error))
        },
        setShelfsError:(error) => {
            dispatch(stockActionCreator.setShelfsError(error))
        },
        showAlertPopup: (type, message) => {
            dispatch(stockActionCreator.showAlertPopup(type, message))
        },
        closeAlertPopup: () => {
            dispatch(stockActionCreator.closeAlertPopup())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomModalForm);