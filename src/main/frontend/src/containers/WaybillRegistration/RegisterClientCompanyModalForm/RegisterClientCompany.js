import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import TextInput from '../../../components/TextInput/TextInput'
import SelectInput from '../../../components/SelectInput/SelectInput'

import {
    checkName,
    checkPrice,
    checkCount,
    checkUnit,
    checkStorage
} from './validation'

class RegisterClientCompanyModalForm extends React.Component {

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
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideRegisterClientCompanyModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideRegisterClientCompanyModalForm}/>
                    <ModalTitle>Зарегистрировать отправителя</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Название компании"
                        error={this.props.nameError}
                        value={this.props.name}
                        onChange={this.props.changeClientCompanyName}
                        onBlur={() => {}} />
                    <TextInput
                        label="Страна"
                        error={this.props.stateError}
                        value={this.props.state}
                        onChange={this.props.changeClientCompanyState}
                        onBlur={() => {}} />
                    <TextInput
                        label="Город"
                        value={this.props.city}
                        error={this.props.cityError}
                        onChange={this.props.changeClientCompanyCity}
                        onBlur={() => {}}/>
                    <TextInput
                        label="Улица"
                        value={this.props.street}
                        error={this.props.streetError}
                        onChange={this.props.changeClientCompanyStreet}
                        onBlur={() => {}} />
                    <TextInput
                        label="Дом"
                        value={this.props.house}
                        error={this.props.houseError}
                        onChange={this.props.changeClientCompanyHouse}
                        onBlur={() => {}} />
                    <TextInput
                        label="Квартира"
                        value={this.props.flat}
                        error={this.props.flatError}
                        onChange={this.props.changeClientCompanyFlat}
                        onBlur={() => {}}/>
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.props.hideRegisterClientCompanyModalForm} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {}} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.waybillRegistrationForm.registerClientCompanyModalForm.isOpen,
        name: state.waybillRegistrationForm.registerClientCompanyModalForm.name,
        nameError: state.waybillRegistrationForm.registerClientCompanyModalForm.validationErrors.nameError,
        state: state.waybillRegistrationForm.registerClientCompanyModalForm.state,
        stateError: state.waybillRegistrationForm.registerClientCompanyModalForm.validationErrors.stateError,
        city: state.waybillRegistrationForm.registerClientCompanyModalForm.city,
        cityError: state.waybillRegistrationForm.registerClientCompanyModalForm.validationErrors.cityError,
        street: state.waybillRegistrationForm.registerClientCompanyModalForm.street,
        streetError: state.waybillRegistrationForm.registerClientCompanyModalForm.validationErrors.streetError,
        house: state.waybillRegistrationForm.registerClientCompanyModalForm.house,
        houseError: state.waybillRegistrationForm.registerClientCompanyModalForm.validationErrors.houseError,
        flat: state.waybillRegistrationForm.registerClientCompanyModalForm.flat,
        flatError: state.waybillRegistrationForm.registerClientCompanyModalForm.validationErrors.flatError,
    }
}

export default connect(mapStateToProps, Actions)(RegisterClientCompanyModalForm);