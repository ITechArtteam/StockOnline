import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import AddProductModalForm from './AddProductModalForm/AddProductModalForm'

import './style.css'

class WaybillProducts extends React.Component {

    renderError() {
        if (this.props.error && (this.props.error != '')) {
            return (<div className="control-label text-danger">{this.props.error}</div>);
        }
        else {
            return (<div>&nbsp;</div>);
        }
    }

    renderFormGroupClassName() {
        if (this.props.error && (this.props.error != '')) {
            return 'form-group has-error';
        }
        else if (this.props.resultType && (this.props.resultType != '')) {
            return 'form-group has-' + this.props.resultType;
        }
        else {
            return 'form-group';
        }
    }


    handleProductSelect(product, isSelected) {
        if (isSelected) {
            this.props.selectProduct(product.name);
        }
        else {
            this.props.selectProduct(null);
        }

        return true;
    }

    handleProductDelete() {
        if (this.props.selectedProductName !== null) {
            this.props.deleteProduct(this.props.selectedProductName);
            this.props.selectProduct(null);
        }
    }

    handleAddProductButtonClick() {
        this.props.changeProductName('');
        this.props.changeProductPrice('');
        this.props.selectProductUnit(null);
        this.props.changeProductCount('');
        this.props.changeProductStorage('');

        this.props.showAddProductModalForm();
    }

    render() {
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelected) => {this.handleProductSelect(row, isSelected)},
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
            <div className='form-group'>
                <label className="control-label">Описание товаров</label>
                <div className="button-container">
                    <input
                        type="button"
                        className="btn btn-primary action-button"
                        value="Добавить"
                        onClick={() => { this.handleAddProductButtonClick() }}/>
                    <AddProductModalForm />
                    <input
                        type="button"
                        className="btn btn-danger action-button"
                        value="Удалить"
                        onClick={() => {this.handleProductDelete()}} />
                </div>
                <BootstrapTable
                    data={this.props.products}
                    selectRow={selectRow}
                    options={options}
                    striped
                    hover>
                    <TableHeaderColumn isKey dataSort dataField="name" width="150">Наименование</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" width="100">Стоимость</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="count"
                        width="120"
                        dataFormat={(cell, row) => {return cell + ' ' + row.unit}}>Количество
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="storage">Способ хранения</TableHeaderColumn>
                </BootstrapTable>
                {this.renderError()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.waybillRegistrationForm.waybillProducts.products,
        selectedProductName: state.waybillRegistrationForm.waybillProducts.selectedProductName
    }
}

export default connect(mapStateToProps, Actions)(WaybillProducts);