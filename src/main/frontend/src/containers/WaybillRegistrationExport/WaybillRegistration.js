import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { Button } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import AlertPopup from '../../components/AlertPopup/AlertPopup'

import TextInput from '../../components/TextInput/TextInput'
import DateInput from '../../components/DateInput/DateInput'
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput'
import DisabledInput from '../../components/DisabledInput/DisabledInput'
import SelectInput from '../../components/SelectInput/SelectInput'
import DriverInfo from './DriverInfo/DriverInfo'
import ChooseSenderModalForm from './ChooseSenderModalForm/ChooseSenderModalForm'
import ChooseCarrierModalForm from './ChooseCarrierModalForm/ChooseCarrierModalForm'
import TransportNumbers from './TransportNumbers/TransportNumbers'
import WaybillProducts from './WaybillProducts/WaybillProducts'
import RegisterClientCompanyModalForm from './RegisterClientCompanyModalForm/RegisterClientCompany'

import * as Actions from './actions'

import {
    checkDescription,
    checkWaybillNumber,
    checkSenderName,
    checkIssuanceDate,
    checkSender,
    checkCarrier,
    checkDriver,
    checkNumbers,
    checkCarNumber,
    checkTrailerNumber,
    checkProducts,
    checkTransportType
} from './validation'


class WaybillRegistration extends React.Component {

    componentWillUnmount() {
        this.props.clearInput();
    }

    handleWaybillNumberOnBlur() {
        this.props.setWaybillNumberError(checkWaybillNumber(this.props.waybillNumber));
    }

    handleSenderNameOnBlur() {
        let error = checkSenderName(this.props.senderName);

        this.props.setSenderNameError(error);

        if (!this.props.chooseCarrierModalFormIsOpen) {
            if (error == '') {
                if (getFilteredItems(this.props.senders, this.props.senderName).length > 0) {
                    this.props.showChooseSenderModal();
                }
                else {
                    this.props.setSenderNameError('Не найдено ни одной компании');
                }
            }
        }
    }

    handleCarrierNameOnBlur() {
        if (!this.props.chooseSenderModalIsOpen && (getFilteredItems(this.props.carriers, this.props.carrierName).length > 0)) {
            this.props.showChooseCarrierModalForm();
        }
    }

    getTotalProductsSum() {
        return this.props.products.reduce(function(sum, current) {
                return sum + current.price * current.count;
            }, 0) + ' у.е.';
    }

    getTotalProductsAmount() {
        return this.props.products.length;
    }

    handleChangeSenderName(name) {
        this.props.changeSenderName(name);
        this.props.setSender(null);
    }

    handleChangeCarrierName(name) {
        this.props.changeCarrierName(name);
        this.props.setCarrier(null);
    }

    handleCloseAlert() {
        this.props.hideSubmitAlert();
        if (this.props.alert.type === 'success') {
            browserHistory.push('/goods/departure');
        }
    }

    handleFormSubmit() {
        const validationResult = this.validateForm();
        if (!validationResult) {
            return;
        }
        let type =  this.props.transportType;
        let numbers = [];
        if (type === 'TRAIN') {
            type = 'Поезд';
            numbers = this.props.numbers.reduce(function(numbers, number) {
                numbers.push(number.number);
                return numbers;
            }, []);
        }
        else if (type === 'CAR') {
            type = 'Автомобиль';
            numbers.push(this.props.carNumber);
            if (this.props.trailerNumber !== '') {
                numbers.push(this.props.trailerNumber);
            }
        }

        const waybill = {
            number: this.props.waybillNumber,
            issueDate: this.props.registrationDate,
            receiverId: this.props.sender.id,
            carrierId: this.props.carrier.id,
            driverPassportNumber: this.props.driver.passportNumber,
            transportType: type,
            numbers: numbers,
            description: this.props.description,
            registeredByLogin: this.props.dispatcher,
            registrationDatetime: getCurrentDateTime(),
            products: this.props.products,
            status: 'Партия сформирована'
        };

        this.props.submitForm(waybill);
    }

    validateForm() {
        let errors = [];
        let error;
        if ((error = this.validateWaybillNumber()) != '') {
            errors.push(error);
        }
        if ((error = this.validateIssuanceDate()) != '') {
            errors.push(error);
        }
        if ((error = this.validateSender()) != '') {
            errors.push(error);
        }
        if ((error = this.validateCarrier()) != '') {
            errors.push(error);
        }
        if ((error = this.validateTransportType()) != '') {
            errors.push(error);
        }

        if ((error = this.validateDriver()) != '') {
            errors.push(error);
        }
        if ((error = this.validateDescription()) != '') {
            errors.push(error);
        }
        if ((error = this.validateProducts()) != '') {
            errors.push(error);
        }

        $.merge(errors, this.validateTransportNumbers());

        return errors.length <= 0;
    }

    validateWaybillNumber() {
        const error = checkWaybillNumber(this.props.waybillNumber);
        this.props.setWaybillNumberError(error);
        return error;
    }

    validateIssuanceDate() {
        const error = checkIssuanceDate(this.props.registrationDate);
        this.props.setIssuanceDateError(error);
        return error;
    }

    validateSender() {
        const error = checkSender(this.props.sender);
        this.props.setSenderNameError(error);
        return error;
    }

    validateCarrier() {
        const error = checkCarrier(this.props.carrier);
        this.props.setCarrierError(error);
        return error;
    }

    validateTransportType() {
        const error = checkTransportType(this.props.transportType);
        this.props.setTransportTypeError(error);
        return error;
    }

    validateDriver() {
        const error = checkDriver(this.props.driver, this.props.transportType);
        this.props.setDriverError(error);
        return error;
    }

    validateTransportNumbers() {
        let errors = [];
        let error;
        if (this.props.transportType) {
            if (this.props.transportType == 'CAR') {
                error = checkCarNumber(this.props.carNumber);
                this.props.setCarNumberError(error);
                if (error != '') {
                    errors.push(error);
                }

                error = checkTrailerNumber(this.props.trailerNumber);
                this.props.setTrailerNumberError(error);
                if (error != '') {
                    errors.push(error);
                }
            }
            else {
                error = checkNumbers(this.props.numbers);
                this.props.setNumbersError(error);
                if (error != '') {
                    errors.push(error);
                }
            }
        }

        return errors;
    }

    validateDescription() {
        const error = checkDescription(this.props.description);
        this.props.setDescriptionError(error);
        return error;
    }

    validateProducts() {
        const error = checkProducts(this.props.products);
        this.props.setProductsError(error);
        return error;
    }

    handleChangeIssuanceDate(value) {
        const error = checkIssuanceDate(value);
        this.props.setIssuanceDateError(error);
        this.props.changeRegistrationDate(value);
    }

    handleRegisterClientCompanyButtonClick() {
        this.props.changeClientCompanyName(this.props.senderName);
        this.props.showRegisterClientCompanyModalForm();
    }

    renderCreateClientCompanyButton() {
        if (getFilteredItems(this.props.senders, this.props.senderName).length == 0) {
            this.props.setSenderNameError('Не найдено ни одной похдодящей компании');
            return (
                <div>
                    <div>
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Зарегистрировать компанию-отправителя"
                            onClick={() => {this.handleRegisterClientCompanyButtonClick()}} />
                        <p>&nbsp;</p>
                    </div>
                </div>
            )
        }
        else {
            this.props.setSenderNameError('');
            return '';
        }
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <h3 className="text-center">Регистрация накладной</h3>
                <form>
                    <TextInput
                        name="waybill-number"
                        label="Номер накладной"
                        value={this.props.waybillNumber}
                        onChange={this.props.changeWaybillNumber}
                        onBlur={() => {this.props.setWaybillNumberError(checkWaybillNumber(this.props.waybillNumber))}}
                        error={this.props.waybillNumberError} />
                    <DateInput
                        value={this.props.registrationDate}
                        onChange={(value) => {this.handleChangeIssuanceDate(value)}}
                        label="Дата выписки накладной"
                        error={this.props.issuanceDateError}
                        onBlur={() => {this.props.setIssuanceDateError(checkIssuanceDate(this.props.registrationDate))}}/>
                    <TextInput
                        error={this.props.senderNameError}
                        name="sender"
                        label="Получатель"
                        value={this.props.senderName}
                        resultType={this.props.sender ? 'success' : 'warning'}
                        onChange={(value) => {this.handleChangeSenderName(value)}}
                        onBlur={() => this.handleSenderNameOnBlur()} />
                    {this.renderCreateClientCompanyButton()}
                    <RegisterClientCompanyModalForm />
                    <ChooseSenderModalForm
                        senders={getFilteredItems(this.props.senders, this.props.senderName)}
                        isOpen={this.props.chooseSenderModalIsOpen} />
                    <DisabledInput
                        name="carrier"
                        label="Перевозчик"
                        value={this.props.carrierName}
                        error={this.props.carrierError}
                        onChange={(value) => {this.handleChangeCarrierName(value)}}
                        onBlur={() => this.handleCarrierNameOnBlur()} />
                    <ChooseCarrierModalForm
                        isOpen={this.props.chooseCarrierModalFormIsOpen}
                        carriers={getFilteredItems(this.props.carriers, this.props.carrierName)} />
                    <DisabledInput
                        label="Тип транспортного средства"
                        error={this.props.transportTypeError}
                        value={getTransportTypeLabel(this.props.transportTypes, this.props.transportType)} />
                    <TransportNumbers transportType={this.props.transportType} error={this.props.numbersError} />
                    <DriverInfo transportType={this.props.transportType} driver={this.props.driver} />
                    <TextAreaInput
                        label="Дополнительное описание товарной партии"
                        value={this.props.description}
                        onChange={this.props.changeWaybillDescription}
                        onBlur={() => {this.props.setDescriptionError(checkDescription(this.props.description))}}
                        error={this.props.descriptionError} />
                    <DisabledInput
                        label="Количество товаров по накладной"
                        value={this.getTotalProductsAmount()} />
                    <DisabledInput
                        label="Диспетчер склада"
                        value={this.props.dispatcher} />
                    <DisabledInput
                        label="Дата и время регистрации накладной"
                        value={getCurrentDateTime()} />
                    <WaybillProducts error={this.props.productsError} />
                    <AlertPopup
                        type={this.props.alert.type}
                        close={() => {this.handleCloseAlert()}}
                        isVisible={this.props.alert.isVisible}
                        message={this.props.alert.message} />
                    <div className="col-lg-offset-5 vertical-offset">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Сохранить"
                            onClick={() => {this.handleFormSubmit()}} />
                    </div>
                </form>
            </div>
        )
    }
}

function getTransportTypeLabel(types, typeName) {
    const filteredTypes = types.filter(function(type) {
        return type.value === typeName;
    });
    return filteredTypes.length > 0 ? filteredTypes[0].label : '';
}

function getCurrentDateTime() {
    var date = new Date();
    return (getFormattedNumberValue(date.getDate()) + "/" +
    (getFormattedNumberValue(date.getMonth() + 1)) + "/" +
    getFormattedNumberValue(date.getFullYear()) + " " +
    getFormattedNumberValue(date.getHours()) + ":" +
    getFormattedNumberValue(date.getMinutes()));
}

function getFormattedNumberValue(number) {
    if (number === 0) {
        return '00';
    }
    else {
        return number > 10 ? number : '0' + number;
    }
}


function getFilteredItems(items, filter) {
    return items.filter(function(item) {
        return item.name.toUpperCase().startsWith(filter.toUpperCase());
    });
}

function mapStateToProps(state) {
    return {
        carNumber: state.waybillRegistrationForm.transportNumbers.car,
        trailerNumber: state.waybillRegistrationForm.transportNumbers.trailer,
        numbers: state.waybillRegistrationForm.transportNumbers.numbers,
        carrier: state.waybillRegistrationForm.carrier,
        sender: state.waybillRegistrationForm.sender,
        carriers: state.waybillRegistrationForm.selectCarrierModalForm.carriers,
        senders: state.waybillRegistrationForm.selectSenderModalForm.senders,
        senderName: state.waybillRegistrationForm.senderName,
        carrierName: state.waybillRegistrationForm.carrierName,
        registrationDate: state.waybillRegistrationForm.registrationDate,
        waybillNumber: state.waybillRegistrationForm.number,
        chooseSenderModalIsOpen: state.waybillRegistrationForm.selectSenderModalForm.isOpen,
        chooseCarrierModalFormIsOpen: state.waybillRegistrationForm.selectCarrierModalForm.isOpen,
        sendersList: state.waybillRegistrationForm.sendersList,
        transportTypes: state.waybillRegistrationForm.transportTypes,
        transportType: state.waybillRegistrationForm.transportType,
        driver: state.waybillRegistrationForm.driver,
        dispatcher: state.auth.username,
        products: state.waybillRegistrationForm.waybillProducts.products,
        description: state.waybillRegistrationForm.description,
        waybillNumberError: state.waybillRegistrationForm.validationErrors.numberError,
        carrierError: state.waybillRegistrationForm.validationErrors.carrierError,
        transportTypeError: state.waybillRegistrationForm.validationErrors.transportTypeError,
        senderNameError: state.waybillRegistrationForm.validationErrors.senderNameError,
        descriptionError: state.waybillRegistrationForm.validationErrors.descriptionError,
        issuanceDateError: state.waybillRegistrationForm.validationErrors.issuanceDateError,
        productsError: state.waybillRegistrationForm.validationErrors.productsError,
        numbersError: state.waybillRegistrationForm.validationErrors.numbersError,
        alert: state.waybillRegistrationForm.submitAlert
    }
}

export default connect(mapStateToProps, Actions)(WaybillRegistration)