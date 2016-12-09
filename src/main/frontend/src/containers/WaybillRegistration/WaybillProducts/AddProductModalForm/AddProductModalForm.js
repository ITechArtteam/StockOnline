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
    checkPrice,
    checkCount,
    checkUnit,
    checkStorage
} from './validation'

class AddNumberModalForm extends React.Component {

    componentWillMount() {
        this.props.loadUnits();
    }

    handleSaveProduct() {
        const errors = this.validateForm();
        if (errors.length < 1) {
            this.props.addProduct({
                name: this.props.name,
                price: this.props.price,
                count: this.props.count,
                storage: this.props.storage,
                unit: this.props.unit
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
        if ((error = this.validatePrice())) {
            errors.push(error);
        }
        if ((error = this.validateStorage())) {
            errors.push(error);
        }
        if ((error = this.validateUnit())) {
            errors.push(error);
        }
        return errors;
    }

    validateName() {
        const error = checkName(this.props.name, this.props.products);
        this.props.setProductNameError(error);
        return error;
    }

    validatePrice() {
        const error = checkPrice(this.props.price);
        this.props.setProductPriceError(error);
        return error;
    }

    validateCount() {
        const error = checkCount(this.props.count);
        this.props.setProductCountError(error);
        return error;
    }

    validateStorage() {
        const error = checkStorage(this.props.storage);
        this.props.setProductStorageError(error);
        return error;
    }

    validateUnit() {
        const error = checkUnit(this.props.unit);
        this.props.setProductUnitError(error);
        return error;
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
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideAddProductModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideAddProductModalForm}/>
                    <ModalTitle>Добавить товар</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Наименование"
                        error={this.props.nameError}
                        value={this.props.name}
                        onChange={this.props.changeProductName}
                        onBlur={() => {this.props.setProductNameError(checkName(this.props.name, this.props.products))}} />
                    <TextInput
                        label="Количество"
                        error={this.props.countError}
                        value={this.props.count}
                        onChange={this.props.changeProductCount}
                        onBlur={() => {this.props.setProductCountError(checkCount(this.props.count))}} />
                    <SelectInput
                        label="Единицы"
                        value={this.props.unit}
                        error={this.props.unitError}
                        options={this.createUnitOptions()}
                        onChange={(value) => {this.props.selectProductUnit(value); this.props.setProductUnitError(checkUnit(value))}}
                        error={this.props.unitError} />
                    <TextInput
                        label="Цена"
                        value={this.props.price}
                        error={this.props.priceError}
                        onChange={this.props.changeProductPrice}
                        onBlur={() => {this.props.setProductPriceError(checkPrice(this.props.price))}} />
                    <TextInput
                        label="Способ хранения"
                        value={this.props.storage}
                        error={this.props.storageError}
                        onChange={this.props.changeProductStorage}
                        onBlur={() => {this.props.setProductStorageError(checkStorage(this.props.storage))}}/>
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
        unit: state.waybillRegistrationForm.waybillProducts.addProductModalForm.unit,
        units: state.waybillRegistrationForm.waybillProducts.addProductModalForm.units,
        storage: state.waybillRegistrationForm.waybillProducts.addProductModalForm.storage,
        nameError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.nameError,
        unitError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.unitError,
        countError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.countError,
        priceError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.priceError,
        storageError: state.waybillRegistrationForm.waybillProducts.addProductModalForm.validationErrors.storageError,
        products: state.waybillRegistrationForm.waybillProducts.products
    }
}

export default connect(mapStateToProps, Actions)(AddNumberModalForm);