import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import TextInput from '../../components/TextInput/component'
import DateInput from '../../components/DateInput/component'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import * as Actions from '../../actions/waybillRegistrationFormActions'

import './style.css'


class WaybillRegistration extends React.Component {

    showChooseSenderModal = () => {
        this.props.showChooseSenderModal();
    };

    hideChooseSenderModal = () => {
        this.props.hideChooseSenderModal();
    };

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <h3 className="text-center">Регистрация накладной</h3>
                <form>
                    <TextInput name="waybill-number" label="Номер накладной" onChange={() => {}} />
                    <DateInput format="DD/MM/YYYY" label="Дата регистрации накладной" />
                    <TextInput name="sender" label="Отправитель" onChange={() => {}} />
                    <Modal isOpen={this.props.chooseSenderModalIsOpen} onRequestHide={this.hideChooseSenderModal}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideChooseSenderModal}/>
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
                            <input type="button" className='btn btn-default' onClick={this.hideChooseSenderModal} value="Отмена" />
                            <input type="button" className='btn btn-primary' value="Выбрать" />
                        </ModalFooter>
                    </Modal>
                    <TextInput name="carrier" label="Перевозчик" onChange={() => {}} />
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
                    <TextInput name="driver" label="Водитель" onChange={() => {}} />
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
