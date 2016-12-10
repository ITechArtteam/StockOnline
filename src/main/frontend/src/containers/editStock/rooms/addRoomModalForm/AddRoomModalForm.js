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

class AddRoomModalForm extends React.Component {

    handleSaveRoom() {
        this.props.addRoom({
            number:  this.props.number,
            cost:    this.props.cost,
            storage: this.props.storage,
            id:      this.props.id
        });
        this.props.hideAddRoomModalForm();
        this.props.clearAddRoomModalFormFields();
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
                        value={this.props.number}
                        onChange={this.props.changeRoomNumber} />

                    <TextInput
                        label="Стоимость хранения"
                        value={this.props.cost}
                        onChange={this.props.changeRoomCost} />
                    <TextInput
                        label="Способ хранения"
                        value={this.props.storage}
                        onChange={this.props.changeRoomStorage} />
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
        isOpen:  (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? state.stock.data.stockRooms.addRoomModalForm.isOpen  : state.stock.data.stockRooms.rooms.isOpen  : false,
        number:  (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? state.stock.data.stockRooms.addRoomModalForm.number  : state.stock.data.stockRooms.rooms.number  : '',
        cost:    (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? state.stock.data.stockRooms.addRoomModalForm.cost    : state.stock.data.stockRooms.rooms.cost    : '',
        storage: (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? state.stock.data.stockRooms.addRoomModalForm.storage : state.stock.data.stockRooms.rooms.storage : '',
        id:      (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? state.stock.data.stockRooms.addRoomModalForm.id      : state.stock.data.stockRooms.rooms.id      : ''
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomModalForm);