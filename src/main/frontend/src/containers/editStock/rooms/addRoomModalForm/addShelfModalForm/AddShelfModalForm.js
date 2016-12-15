import React from 'react'
import {connect} from 'react-redux'
import {stockActionCreator} from "./../../../index";

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import TextInput from '../../../../../components/TextInput/TextInput'

import {
    checkShelfNumber,
    checkShelfCapacity
} from './../validation'

class AddShelfModalForm extends React.Component {

    handleSaveShelf() {
        const errors = this.validateForm();
        if (errors.length < 1) {
            this.props.addShelf({
                number: this.props.number,
                capacity: this.props.capacity,
                isFree: this.props.isFree,
                idShelf: this.props.idShelf
            });
            this.props.hideAddShelfModalForm();
            this.props.clearAddShelfModalFormFields();
        }
    }
    validateForm() {
        let errors = [];
        let error;
        if ((error = this.validateShelfNumber())) {
            if (error != ''){
                errors.push(error);
            }
        }
        if ((error = this.validateShelfCapacity())) {
            if (error != '') {
                errors.push(error);
            }
        }
        return errors;
    }

    validateShelfNumber() {
        const error = checkShelfNumber(this.props.number, this.props.shelfs);
        this.props.setShelfNumberError(error);
        return error;
    }

    validateShelfCapacity() {
        const error = checkShelfCapacity(this.props.capacity);
        this.props.setShelfCapacityError(error);
        return error;
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideAddShelfModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideAddShelfModalForm}/>
                    <ModalTitle>Добавить место хранение</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Место хранение"
                        error={this.props.numberError}
                        value={this.props.number}
                        onChange={this.props.changeShelfNumber}
                        onBlur={() => {this.props.setShelfNumberError(checkShelfNumber(this.props.number))}}/>

                    <TextInput
                        label="Вместимость"
                        error={this.props.capacityError}
                        value={this.props.capacity}
                        onChange={this.props.changeShelfCapacity}
                        onBlur={() => {this.props.setShelfCapacityError(checkShelfCapacity(this.props.capacity))}}/>
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.props.hideAddShelfModalForm} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSaveShelf()}} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpen:    (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.isOpen   : false : false : false,
        number:    (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.number   : '' : '' : '',
        capacity:  (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.capacity : '' : '' : '',
        isFree:    (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.isFree   : '' : '' : '',
        idShelf:   (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.idShelf  : '' : '' : '',
        numberError:   (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.validationErrors) ? state.stock.data.stockRooms.addRoomModalForm.validationErrors.numberError   : '' : '',
        capacityError: (!!state.stock.data.stockRooms.addRoomModalForm) ? (!!state.stock.data.stockRooms.addRoomModalForm.validationErrors) ? state.stock.data.stockRooms.addRoomModalForm.validationErrors.capacityError : '' : '',
        shelfs:  (!!state.stock.data.stockRooms) ? (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.shelfs  : state.stock.data.stockRooms.rooms.shelfs  : [],
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addShelf:(shelf) => {
            dispatch(stockActionCreator.addShelf(shelf))
        },
        clearAddShelfModalFormFields:() => {
            dispatch(stockActionCreator.clearAddShelfModalFormFields())
        },
        hideAddShelfModalForm:() => {
            dispatch(stockActionCreator.hideAddShelfModalForm())
        },
        changeShelfNumber:(number) => {
            dispatch(stockActionCreator.changeShelfNumber(number))
        },
        changeShelfCapacity:(capacity) => {
            dispatch(stockActionCreator.changeShelfCapacity(capacity))
        },
        selectShelfUnit:(unit) => {
            dispatch(stockActionCreator.selectRoomUnit(unit))
        },
        setShelfsError:(error) => {
            dispatch(stockActionCreator.setShelfsError(error))
        },
        setShelfNumberError:(error) => {
            dispatch(stockActionCreator.setShelfNumberError(error))
        },
        setShelfCapacityError:(error) => {
            dispatch(stockActionCreator.setShelfCapacityError(error))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShelfModalForm);