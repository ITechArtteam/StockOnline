import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import AddProductModalForm from './AddProductModalForm/AddProductModalForm'

import './style.css'

class WaybillProducts extends React.Component {

    render() {
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            hideSelectColumn: true
        };

        const options = {
            noDataText: "Товары не указаны",
            handleConfirmDeleteRow(next, dropRowKeys) {
                next();
            }
        };

        return (
            <div className="form-group">
                <label className="control-label">Описание товаров</label>
                <div className="button-container">
                    <input
                        type="button"
                        className="btn btn-primary action-button"
                        value="Добавить"
                        onClick={this.props.showAddProductModalForm}/>
                    <AddProductModalForm />
                    <input
                        type="button"
                        className="btn btn-danger action-button"
                        value="Удалить" />
                </div>
                <BootstrapTable
                    data={this.props.products}
                    selectRow={selectRow}
                    options={options}
                    striped
                    hover>
                    <TableHeaderColumn isKey dataField="name">Наименование</TableHeaderColumn>
                    <TableHeaderColumn dataField="count">Количество</TableHeaderColumn>
                    <TableHeaderColumn dataField="price">Стоимость</TableHeaderColumn>
                    <TableHeaderColumn dataField="storage">Способ хранения</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.waybillRegistrationForm.waybillProducts.products
    }
}

export default connect(mapStateToProps, Actions)(WaybillProducts);