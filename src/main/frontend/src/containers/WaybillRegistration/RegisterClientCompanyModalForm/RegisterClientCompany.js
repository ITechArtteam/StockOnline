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
    checkState,
    checkCity,
    checkStreet,
    checkHouse,
    checkFlat
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
        const error = checkName(this.props.name, this.props.companies);
        this.props.setClientCompanyNameError(error);
        return error;
    }

    validateState() {
        const error = checkState(this.props.state);
        this.props.setClientCompanyStateError(error);
        return error;
    }

    validateCity() {
        const error = checkCity(this.props.city);
        this.props.setClientCompanyCityError(error);
        return error;
    }

    validateStreet() {
        const error = checkStreet(this.props.street);
        this.props.setClientCompanyStreetError(error);
        return error;
    }

    validateHouse() {
        const error = checkHouse(this.props.house);
        this.props.setClientCompanyHouseError(error);
        return error;
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
                        onBlur={() => {this.props.setClientCompanyNameError(checkName(this.props.name, this.props.companies))}} />
                    <TextInput
                        label="Страна"
                        error={this.props.stateError}
                        value={this.props.state}
                        onChange={this.props.changeClientCompanyState}
                        onBlur={() => {this.props.setClientCompanyStateError(checkState(this.props.state))}} />
                    <TextInput
                        label="Город"
                        value={this.props.city}
                        error={this.props.cityError}
                        onChange={this.props.changeClientCompanyCity}
                        onBlur={() => {this.props.setClientCompanyCityError(checkCity(this.props.city))}} />
                    <TextInput
                        label="Улица"
                        value={this.props.street}
                        error={this.props.streetError}
                        onChange={this.props.changeClientCompanyStreet}
                        onBlur={() => {this.props.setClientCompanyStreetError(checkStreet(this.props.street))}} />
                    <TextInput
                        label="Дом"
                        value={this.props.house}
                        error={this.props.houseError}
                        onChange={this.props.changeClientCompanyHouse}
                        onBlur={() => {this.props.setClientCompanyHouseError(checkHouse(this.props.house))}} />
                    <TextInput
                        label="Квартира"
                        value={this.props.flat}
                        error={this.props.flatError}
                        onChange={this.props.changeClientCompanyFlat}
                        onBlur={() => {this.props.setClientCompanyFlatError(checkFlat(this.props.flat))}} />
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
        companies: state.waybillRegistrationForm.selectSenderModalForm.senders
    }
}

export default connect(mapStateToProps, Actions)(RegisterClientCompanyModalForm);