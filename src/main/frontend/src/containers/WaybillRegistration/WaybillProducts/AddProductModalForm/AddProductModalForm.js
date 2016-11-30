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
        this.props.addProduct({
            name: this.props.name,
            price: this.props.price,
            count: this.props.count,
            storage: this.props.storage
        });
        this.props.hideAddProductModalForm();
        this.props.clearAddProductModalFormFields();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideAddProductModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideAddProductModalForm}/>
                    <ModalTitle>Добавить товар</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Название"
                        value={this.props.name}
                        onChange={this.props.changeProductName} />
                    <TextInput
                        label="Количество"
                        value={this.props.count}
                        onChange={this.props.changeProductCount} />
                    <TextInput
                        label="Цена"
                        value={this.props.price}
                        onChange={this.props.changeProductPrice} />
                    <TextInput
                        label="Способ хранения"
                        value={this.props.storage}
                        onChange={this.props.changeProductStorage} />
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