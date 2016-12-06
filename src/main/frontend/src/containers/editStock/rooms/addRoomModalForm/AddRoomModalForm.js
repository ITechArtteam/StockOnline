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
import SelectInput from '../../../../components/SelectInput/SelectInput'

class AddRoomModalForm extends React.Component {

    componentWillMount() {
        //this.props.loadUnits();
    }

    handleSaveRoom() {
        this.props.addRoom({
            number: this.props.number,
            cost: this.props.cost,
            storage: this.props.storage,
            unit: this.props.unit
        });
        this.props.hideAddRoomModalForm();
        this.props.clearAddRoomModalFormFields();
    }

    createUnitOptions() {
        return this.props.units.reduce(function(options, unit) {
            options.push({
                value: unit,
                label: unit
            });
            return options;
        }, []);
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
                        label="Цена"
                        value={this.props.cost}
                        onChange={this.props.changeRoomCost} />
                    <TextInput
                        label="Способ хранения"
                        value={this.props.storage}
                        onChange={this.props.changeRoomStorage} />
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
        isOpen: state.stock.stockRooms.addRoomModalForm.isOpen,
        number: state.stock.stockRooms.addRoomModalForm.number,
        cost: state.stock.stockRooms.addRoomModalForm.cost,
        unit: state.stock.stockRooms.addRoomModalForm.unit,
        units: state.stock.stockRooms.addRoomModalForm.units,
        storage: state.stock.stockRooms.addRoomModalForm.storage
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
        setUnits:(units) => {
            dispatch(stockActionCreator.setUnits(units))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomModalForm);