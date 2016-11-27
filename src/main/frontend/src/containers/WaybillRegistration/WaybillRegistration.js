import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import StaticControl from '../../components/StaticControl/StaticControl'

import TextInput from '../../components/TextInput/TextInput'
import DateInput from '../../components/DateInput/DateInput'
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput'
import DisabledInput from '../../components/DisabledInput/DisabledInput'
import SelectInput from '../../components/SelectInput/SelectInput'
import DriverInfo from './DriverInfo/DriverInfo'
import ChooseSenderModalForm from './ChooseSenderModalForm/ChooseSenderModalForm'
import ChooseCarrierModalForm from './ChooseCarrierModalForm/ChooseCarrierModalForm'
import TransportNumbers from './TransportNumbers/TransportNumbers'



import * as Actions from './actions'


class WaybillRegistration extends React.Component {

    handleSenderNameOnBlur() {
        if (!this.props.chooseCarrierModalFormIsOpen) {
            this.props.showChooseSenderModal();
        }
    }

    handleCarrierNameOnBlur() {
        if (!this.props.chooseSenderModalIsOpen) {
            this.props.showChooseCarrierModalForm();
        }
    }

    handleSaveSenderFormSubmit(value) {
        this.props.hideChooseSenderModal();
    }

    handleChooseCarrierFormSubmit(value) {
        this.props.hideChooseCarrierModalForm();
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
                        format="DD/MM/YYYY"
                        label="Дата регистрации накладной" />
                    <TextInput
                        name="sender"
                        label="Отправитель"
                        onChange={() => {}}
                        onBlur={() => this.handleSenderNameOnBlur()} />
                    <ChooseSenderModalForm
                        isOpen={this.props.chooseSenderModalIsOpen}
                        onSave={(value) => {this.handleSaveSenderFormSubmit(value)}}
                        onHide={this.props.hideChooseSenderModal} />
                    <TextInput
                        name="carrier"
                        label="Перевозчик"
                        onChange={() => {}}
                        onBlur={() => this.handleCarrierNameOnBlur()} />
                    <ChooseCarrierModalForm
                        isOpen={this.props.chooseCarrierModalFormIsOpen}
                        onSave={(value) => {this.handleChooseCarrierFormSubmit(value)}}
                        onHide={this.props.hideChooseCarrierModalForm} />
                    <SelectInput
                        label="Тип транспортного средства"
                        options={[{value: 'TRAIN', label: 'Поезд'}, {value: 'CAR', label: 'Автомобиль'}]}
                        value={this.props.transportType}
                        onChange={this.props.setTransportType} />
                    <TransportNumbers transportType={this.props.transportType} />
                    <DriverInfo driver={this.props.driver} />
                    <TextAreaInput
                        label="Дополнительное описание товарной партии"
                        value={this.props.description}
                        onChange={() => {}} />
                    <DisabledInput label="Сумма товаров по накладной" />
                    <DisabledInput label="Количество товаров по накладной" />
                    <DisabledInput label="Диспетчер склада" />
                    <div className="form-group">
                        <label className="control-label">Описание товаров</label>
                        <BootstrapTable
                            data={[]}
                            selectRow={{
                                mode: "checkbox",
                                clickToSelect: true,
                                bgColor: "rgb(238, 193, 213)",
                                hideSelectColumn: true
                            }}
                            options={{
                                noDataText: "Товары не указаны",
                                handleConfirmDeleteRow(next, dropRowKeys) {
                                    next();
                                }
                            }}
                            striped hover insertRow deleteRow >
                            <TableHeaderColumn isKey dataField="name">Наименование</TableHeaderColumn>
                            <TableHeaderColumn dataField="weight">Вес</TableHeaderColumn>
                            <TableHeaderColumn dataField="price">Стоимость</TableHeaderColumn>
                            <TableHeaderColumn dataField="storeWay">Способ хранения</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    <div className="col-lg-offset-5 vertical-offset">
                        <input type="button" className="btn btn-primary" value="Сохранить" />
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        waybillNumber: state.waybillRegistrationForm.number,
        chooseSenderModalIsOpen: state.waybillRegistrationForm.chooseSenderModalIsOpen,
        chooseCarrierModalFormIsOpen: state.waybillRegistrationForm.chooseCarrierModalFormIsOpen,
        sendersList: state.waybillRegistrationForm.sendersList,
        transportTypes: state.waybillRegistrationForm.transportTypes,
        transportType: state.waybillRegistrationForm.transportType,
        driver: state.waybillRegistrationForm.driver
    }
}

export default connect(mapStateToProps, Actions)(WaybillRegistration)
