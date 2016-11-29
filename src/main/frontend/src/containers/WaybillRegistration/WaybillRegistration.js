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


class WaybillRegistration extends React.Component {

    handleSenderNameOnBlur() {
        if (!this.props.chooseCarrierModalFormIsOpen && (this.props.senderName.length > 0)
            && (getFilteredItems(this.props.senders, this.props.senderName).length > 0)) {
            this.props.showChooseSenderModal();
        }
    }

    handleCarrierNameOnBlur() {
        if (!this.props.chooseSenderModalIsOpen && (this.props.carrierName.length > 0)
            && (getFilteredItems(this.props.carriers, this.props.carrierName).length > 0)) {
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
        const type =  this.props.transportType;
        let numbers = [];
        if (type === 'TRAIN') {
            numbers = this.props.numbers.reduce(function(numbers, number) {
                numbers.push(number.number);
                return numbers;
            }, []);
        }
        else if (type === 'CAR') {
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
            transportType: this.props.transportType,
            numbers: numbers,
            description: this.props.description,
            registrationDatetime: getCurrentDateTime(),
            products: this.props.products
        };
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(waybill),
            dataType: 'json',
            url: '/waybills/register'
        });
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
                        onChange={this.props.changeWaybillNumber} />
                    <DateInput
                        value={this.props.registrationDate}
                        onChange={this.props.changeRegistrationDate}
                        label="Дата выписки накладной" />
                    <TextInput
                        name="sender"
                        label="Отправитель"
                        value={this.props.senderName}
                        onChange={(value) => {this.handleChangeSenderName(value)}}
                        onBlur={() => this.handleSenderNameOnBlur()} />
                    <ChooseSenderModalForm
                        senders={getFilteredItems(this.props.senders, this.props.senderName)}
                        isOpen={this.props.chooseSenderModalIsOpen}
                        onSave={(value) => {this.handleSaveSenderFormSubmit(value)}}
                        onHide={this.props.hideChooseSenderModal} />
                    <TextInput
                        name="carrier"
                        label="Перевозчик"
                        value={this.props.carrierName}
                        onChange={(value) => {this.handleChangeCarrierName(value)}}
                        onBlur={() => this.handleCarrierNameOnBlur()} />
                    <ChooseCarrierModalForm
                        isOpen={this.props.chooseCarrierModalFormIsOpen}
                        carriers={getFilteredItems(this.props.carriers, this.props.carrierName)}
                        onSave={(value) => {this.handleChooseCarrierFormSubmit(value)}}
                        onHide={this.props.hideChooseCarrierModalForm} />
                    <SelectInput
                        label="Тип транспортного средства"
                        options={[{value: 'TRAIN', label: 'Поезд'}, {value: 'CAR', label: 'Автомобиль'}]}
                        value={this.props.transportType}
                        onChange={this.props.setTransportType} />
                    <TransportNumbers transportType={this.props.transportType} />
                    <DriverInfo transportType={this.props.transportType} driver={this.props.driver} />
                    <TextAreaInput
                        label="Дополнительное описание товарной партии"
                        value={this.props.description}
                        onChange={this.props.changeWaybillDescription} />
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

function getCurrentDateTime() {
    var date = new Date();
    return date.getDate() + "/" +
        (date.getMonth() + 1) + "/" +
        date.getFullYear() + " " +
        date.getHours() + ":" +
        date.getMinutes();
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
        description: state.waybillRegistrationForm.description
    }
}

export default connect(mapStateToProps, Actions)(WaybillRegistration)
