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
import SelectInput from '../../../../components/SelectInput/SelectInput'

import {
    checkName,
    checkCount
} from './validation'

class AddNumberModalForm extends React.Component {

    componentWillMount() {
         this.props.loadAvailableProducts();
    }

    handleSaveProduct() {
        const errors = this.validateForm();
        if (errors.length < 1) {
            const product = getProductByName(this.props.availableProducts, this.props.name);
            this.props.addProduct({
                name: this.props.name,
                count: this.props.count,
                storage: product.storage.type
            });
            this.props.hideAddProductModalForm();
            this.props.clearAddProductModalFormFields();
        }
    }

    validateForm() {
        let errors = [];
        let error;
        if ((error = this.validateName())) {
            errors.push(error);
        }
        if ((error = this.validateCount())) {
            errors.push(error);
        }

        return errors;
    }

    validateName() {
        const error = checkName(this.props.name, this.props.products, this.props.availableProducts);
        this.props.setProductNameError(error);
        return error;
    }


    validateCount() {
        const error = checkCount(this.props.count, this.props.name, this.props.availableProducts);
        this.props.setProductCountError(error);
        return error;
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
                        label="Наименование*"
                        error={this.props.nameError}
                        value={this.props.name}
                        onChange={this.props.changeProductName}
                        onBlur={() => {this.props.setProductNameError(checkName(this.props.name, this.props.products, this.props.availableProducts))}} />
                    <TextInput
                        label="Количество*"
                        error={this.props.countError}
                        value={this.props.count}
                        onChange={this.props.changeProductCount}
                        onBlur={() => {this.props.setProductCountError(checkCount(this.props.count, this.props.name, this.props.availableProducts))}} />
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.props.hideAddProductModalForm} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSaveProduct()}} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function getProductByName(products, name) {
    return products.filter(function(product) {
        return product.name == name;
    })[0];
}

function mapStateToProps(state) {
    return {
        isOpen: state.waybillRegistrationForm.waybillProducts.addProductModalForm.isOpen,
        name: state.waybillRegistrationForm.waybillProducts.addProductModalForm.name,
        count: state.waybillRegistrationForm.waybillProducts.addProductModalForm.count,
        nameError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.nameError,
        countError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.countError,
        products: state.waybillRegistrationForm.waybillProducts.products,
        availableProducts: state.waybillRegistrationForm.waybillProducts.availableProducts
    }
}

export default connect(mapStateToProps, Actions)(AddNumberModalForm);