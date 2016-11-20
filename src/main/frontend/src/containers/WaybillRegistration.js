import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as Actions from '../actions'
import Select from 'react-select';


import 'react-select/dist/react-select.css';
import Calendar from 'react-input-calendar'
require('react-input-calendar/style/index.css');

class WaybillRegistration extends React.Component {
    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
            <label className="control-label">{label}</label>
            <div>
                <input {...input} placeholder={label} className="form-control" type={type} />
                {touched && error && <div className="help-block">{error}</div>}
            </div>
        </fieldset>
    );

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3 className="text-center">{isNaN(this.props.params.id) ? 'Создание накладной' : 'Редактирование накладной'}</h3>
                <form>
                    <Field name="waybill-number"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Номер накладной" />
                    <label className="control-label">Дата регистрации</label>
                    <Calendar format='DD/MM/YYYY' />
                    <Field name="sender"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Отправитель" />
                    <Field name="carrier"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Перевозчик" />
                    <Field name="number"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Номера" />
                    <Field name="driver"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Водитель" />
                    <Field name="description"
                           component={this.renderField}
                           className="form-control"
                           type="textarea"
                           label="Дополнительное описание товарной партии" />
                    <Field name="goods-total-sum"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Сумма товаров по накладной" />
                    <Field name="goods-amount"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Количество наименований товаров" />
                    <Field name="dispatcher"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Диспетчер склада" />
                    <Field name="registration-datetime"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Дата и время регистрации накладной" />
                    <label className="control-label">Описание товаров</label>
                    <BootstrapTable data={
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
                    } hover={true} striped={false} >
                        <TableHeaderColumn isKey dataField="name">Наименование</TableHeaderColumn>
                        <TableHeaderColumn dataField="weight">Вес</TableHeaderColumn>
                        <TableHeaderColumn dataField="price">Стоимость</TableHeaderColumn>
                        <TableHeaderColumn dataField="storeWay">Способ хранения</TableHeaderColumn>
                    </BootstrapTable>
                </form>
            </div>
        )
    }
}

export default connect(null, Actions)(reduxForm({
    form: 'waybillRegistration'
})(WaybillRegistration));
