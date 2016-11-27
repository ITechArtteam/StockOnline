import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import TextInput from '../../../../components/TextInput/TextInput'

class AddNumberModalForm extends React.Component {

    handleSaveProduct() {
        /*this.props.addNumber({
            number: this.props.number
        });
        this.props.hideAddNumberModalForm();
        this.props.changeBeingCreatedNumber('');*/
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideAddProductModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideAddProductModalForm}/>
                    <ModalTitle>Добавить номер</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Название"
                        value={this.props.name}
                        onChange={() => {}} />
                    <TextInput
                        label="Количество"
                        value={this.props.count}
                        onChange={() => {}} />
                    <TextInput
                        label="Цена"
                        value={this.props.price}
                        onChange={() => {}} />
                    <TextInput
                        label="Способ хранения"
                        value={this.props.storage}
                        onChange={() => {}} />
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.props.hideAddProductModalForm} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSaveProduct()}} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.waybillRegistrationForm.waybillProducts.addProductModalForm.isOpen,
        name: state.waybillRegistrationForm.waybillProducts.addProductModalForm.name,
        count: state.waybillRegistrationForm.waybillProducts.addProductModalForm.count,
        price: state.waybillRegistrationForm.waybillProducts.addProductModalForm.price,
        storage: state.waybillRegistrationForm.waybillProducts.addProductModalForm.storage
    }
}

export default connect(mapStateToProps, Actions)(AddNumberModalForm);