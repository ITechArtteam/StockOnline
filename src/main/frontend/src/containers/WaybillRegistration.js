import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Select from 'react-select';


import 'react-select/dist/react-select.css';
import Calendar from 'react-input-calendar'
require('react-input-calendar/style/index.css');

class WaybillRegistration extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3 className="text-center">Регистрация накладной</h3>
                <form>
                    <div className="form-group">
                        <label className="control-label">Номер накладной</label>
                        <input
                            type="text"
                            name="waybill-number"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Дата выписки накладной</label>
                        <Calendar format='DD/MM/YYYY' />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Отправитель</label>
                        <input
                            type="text"
                            name="sender"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Перевозчик</label>
                        <input
                            type="text"
                            name="carrier"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Номера транспортных средств</label>
                        <BootstrapTable data={[]} hover={true} striped={true}>
                            <TableHeaderColumn dataField="type">Транспортное средство</TableHeaderColumn>
                            <TableHeaderColumn isKey dataField="number">Номер</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Водитель</label>
                        <input
                            type="text"
                            className="form-control"
                            name="driver" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Дополнительное описание товарной партии</label>
                        <textarea
                            className="form-control"
                            name="description" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Сумма товаров по накладной</label>
                        <input
                            type="text"
                            className="form-control"
                            name="goods-total-sum"
                            disabled />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Количество товаров по накладной</label>
                        <input
                            type="text"
                            className="form-control"
                            name="goods-total-amount"
                            disabled />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Диспетчер склада</label>
                        <input
                            type="text"
                            className="form-control"
                            name="dispatcher"
                            disabled />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Дата и время регистрации накладной</label>
                        <input
                            type="text"
                            className="form-control"
                            name="goods-total-sum"
                            disabled />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Описание товаров</label>
                        <BootstrapTable
                            data={
                                [
                                    {
                                        name: 'TESTNAME',
                                        weight: 'TESTWEIGHT',
                                        price: 'TESTPRICE',
                                        storeWay: 'TESTSTOREWAY'
                                    },
                                    {
                                        name: 'TESTNAME11',
                                        weight: 'TESTWEIGHT1',
                                        price: 'TESTPRICE1',
                                        storeWay: 'TESTSTOREWAY1'
                                    }
                                ]
                            }
                            selectRow={{
                                mode: "checkbox",
                                clickToSelect: true,
                                bgColor: "rgb(238, 193, 213)"
                            }}
                            options={{
                                noDataText: "Товары не указаны",
                                handleConfirmDeleteRow(next, dropRowKeys) {
                                    next();
                                }
                            }}
                                        hover striped condensed insertRow deleteRow >
                            <TableHeaderColumn isKey dataField="name">Наименование</TableHeaderColumn>
                            <TableHeaderColumn dataField="weight">Вес</TableHeaderColumn>
                            <TableHeaderColumn dataField="price">Стоимость</TableHeaderColumn>
                            <TableHeaderColumn dataField="storeWay">Способ хранения</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, Actions)(WaybillRegistration);
