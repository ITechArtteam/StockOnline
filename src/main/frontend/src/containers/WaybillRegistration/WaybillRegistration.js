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
import ChooseSenderModalForm from './ChooseSenderModalForm/ChooseSenderModalForm'
import TransportNumbers from './TransportNumbers/TransportNumbers'



import * as Actions from './actions'


class WaybillRegistration extends React.Component {

    handleSaveSenderFormSubmit(value) {
        this.props.hideChooseSenderModal();
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
                        onBlur={this.props.showChooseSenderModal} />
                    <ChooseSenderModalForm
                        isOpen={this.props.chooseSenderModalIsOpen}
                        onSave={(value) => {this.handleSaveSenderFormSubmit(value)}}
                        onHide={this.props.hideChooseSenderModal} />
                    <TextInput
                        name="carrier"
                        label="Перевозчик"
                        onChange={() => {}} />
                    <SelectInput
                        label="Тип транспортного средства"
                        options={[{value: 'TRAIN', label: 'Поезд'}, {value: 'CAR', label: 'Автомобиль'}]}
                        value={this.props.transportType}
                        onChange={this.props.setTransportType} />
                    <TransportNumbers transportType={this.props.transportType} />
                    <TextInput
                        name="driver"
                        label="Водитель"
                        onChange={() => {}} />
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
        sendersList: state.waybillRegistrationForm.sendersList,
        transportTypes: state.waybillRegistrationForm.transportTypes,
        transportType: state.waybillRegistrationForm.transportType
    }
}

export default connect(mapStateToProps, Actions)(WaybillRegistration)
