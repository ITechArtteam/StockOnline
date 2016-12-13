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

class AddShelfModalForm extends React.Component {

    handleSaveShelf() {
        this.props.addShelf({
            number: this.props.number,
            capacity: this.props.capacity,
            isFree: this.props.isFree,
            idShelf: this.props.idShelf
        });
        this.props.hideAddShelfModalForm();
        this.props.clearAddShelfModalFormFields();
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
                        value={this.props.number}
                        onChange={this.props.changeShelfNumber} />

                    <TextInput
                        label="Вместимость"
                        value={this.props.capacity}
                        onChange={this.props.changeShelfCapacity} />
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
        isOpen:   (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.isOpen   : state.stock.data.stockRooms.addRoomModalForm.shelfs.isOpen   : false : false,
        number:   (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.number   : state.stock.data.stockRooms.addRoomModalForm.shelfs.number   : ''    : '',
        capacity: (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.capacity : state.stock.data.stockRooms.addRoomModalForm.shelfs.capacity : ''    : '',
        isFree:   (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.isFree   : state.stock.data.stockRooms.addRoomModalForm.shelfs.isFree   : true : true,
        idShelf:  (!!state.stock.data.stockRooms)  ? (!!state.stock.data.stockRooms.addRoomModalForm)  ? (!!state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm) ? state.stock.data.stockRooms.addRoomModalForm.addShelfModalForm.idShelf       : state.stock.data.stockRooms.addRoomModalForm.shelfs.idShelf       : -1    : -1
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShelfModalForm);