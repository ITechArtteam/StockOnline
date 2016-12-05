import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

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

import * as Actions from './actions'

import {
    checkDescription,
    checkWaybillNumber,
    checkSenderName,
    checkIssuanceDate
} from './validation'


class WaybillRegistration extends React.Component {

    handleWaybillNumberOnBlur() {
        this.props.setWaybillNumberError(checkWaybillNumber(this.props.waybillNumber));
    }

    handleSenderNameOnBlur() {
        let error = checkSenderName(this.props.waybillNumber);

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

    handleFormSubmit() {
        this.validateForm();
        /*let type =  this.props.transportType;
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
            senderId: this.props.sender.id,
            carrierId: this.props.carrier.id,
            driverPassportNumber: this.props.driver.passportNumber,
            transportType: type,
            numbers: numbers,
            description: this.props.description,
            dispatcherLogin: this.props.dispatcher,
            registrationDatetime: getCurrentDateTime(),
            products: this.props.products
        };
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(waybill),
            dataType: 'json',
            url: '/waybills/register'
        });*/
    }

    validateForm() {
        let errors = [];
        let error;
        if ((error = checkDescription(this.props.description)) != '') {
            errors.push(error);
        }
        if (errors.length > 0) {
            alert(errors);
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
                        onChange={this.props.changeRegistrationDate}
                        label="Дата выписки накладной"
                        onBlur={() => {this.props.setIssuanceDateError(checkIssuanceDate(this.props.registrationDate))}}
                        error={this.props.issuanceDateError} />
                    <TextInput
                        error={this.props.senderNameError}
                        name="sender"
                        label="Отправитель"
                        value={this.props.senderName}
                        resultType={this.props.sender ? 'success' : 'warning'}
                        onChange={(value) => {this.handleChangeSenderName(value)}}
                        onBlur={() => this.handleSenderNameOnBlur()} />
                    <ChooseSenderModalForm
                        senders={getFilteredItems(this.props.senders, this.props.senderName)}
                        isOpen={this.props.chooseSenderModalIsOpen} />
                    <DisabledInput
                        name="carrier"
                        label="Перевозчик"
                        value={this.props.carrierName}
                        onChange={(value) => {this.handleChangeCarrierName(value)}}
                        onBlur={() => this.handleCarrierNameOnBlur()} />
                    <ChooseCarrierModalForm
                        isOpen={this.props.chooseCarrierModalFormIsOpen}
                        carriers={getFilteredItems(this.props.carriers, this.props.carrierName)} />
                    <DisabledInput
                        label="Тип транспортного средства"
                        value={getTransportTypeLabel(this.props.transportTypes, this.props.transportType)} />
                    <TransportNumbers transportType={this.props.transportType} />
                    <DriverInfo transportType={this.props.transportType} driver={this.props.driver} />
                    <TextAreaInput
                        label="Дополнительное описание товарной партии"
                        value={this.props.description}
                        onChange={this.props.changeWaybillDescription}
                        onBlur={() => {this.props.setDescriptionError(checkDescription(this.props.description))}}
                        error={this.props.descriptionError} />
                    <DisabledInput
                        label="Сумма товаров по накладной"
                        value={this.getTotalProductsSum()} />
                    <DisabledInput
                        label="Количество товаров по накладной"
                        value={this.getTotalProductsAmount()} />
                    <DisabledInput
                        label="Диспетчер склада"
                        value={this.props.dispatcher} />
                    <DisabledInput
                        label="Дата и время регистрации накладной"
                        value={getCurrentDateTime()} />
                    <WaybillProducts />
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
        senderNameError: state.waybillRegistrationForm.validationErrors.senderNameError,
        descriptionError: state.waybillRegistrationForm.validationErrors.descriptionError,
        issuanceDateError: state.waybillRegistrationForm.validationErrors.issuanceDateError
    }
}

export default connect(mapStateToProps, Actions)(WaybillRegistration)