import React from 'react'
import { Button } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { connect } from 'react-redux'
import * as Actions from '../actions/waybillRegistrationFormActions'
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import Calendar from 'react-input-calendar'
require('react-input-calendar/style/index.css');

import './WaybillRegistration.css'

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

class WaybillRegistration extends React.Component {
    hideChooseSender() {
    }

    showChooseSender() {
        this.props.showChooseSenderModal();
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
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
                        <label className="control-label">Дата регистрации накладной</label>
                        <Calendar format='DD/MM/YYYY' />
                    </div>
                    <div className="form-group" onclick={this.showChooseSender}>
                        <label className="control-label">Отправитель</label>
                        <input
                            type="text"
                            name="sender"
                            className="form-control"
                            onBlur={this.showChooseSender} />
                    </div>
                    <Modal isOpen={this.props.chooseSenderModalIsOpen} onRequestHide={this.hideChooseSender}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideChooseSender}/>
                            <ModalTitle>Modal title</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Select options={[
                                {
                                    value: 'one',
                                    label: 'labelone'
                                }
                            ]} value="one" />
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-default' onClick={this.hideChooseSenderModal}>
                                Close
                            </button>
                            <button className='btn btn-primary'>
                                Save changes
                            </button>
                        </ModalFooter>
                    </Modal>
                    <div className="form-group">
                        <label className="control-label">Перевозчик</label>
                        <input
                            type="text"
                            name="carrier"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Номера транспортных средств</label>
                        <BootstrapTable
                            data={[]}
                            selectRow={{
                                mode: "checkbox",
                                clickToSelect: true,
                                bgColor: "rgb(238, 193, 213)",
                                hideSelectColumn: true
                            }}
                            options={{
                                noDataText: "Ни один номер не указан",
                                handleConfirmDeleteRow(next, dropRowKeys) {
                                    next();
                                }
                            }}
                            striped hover insertRow deleteRow >
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
                    <div>
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
                        <Button bsStyle="primary">Сохранить</Button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        chooseSenderModalIsOpen: state.waybillRegistrationForm.chooseSenderModalIsOpen
    }
}

export default connect(mapStateToProps, Actions)(WaybillRegistration)
