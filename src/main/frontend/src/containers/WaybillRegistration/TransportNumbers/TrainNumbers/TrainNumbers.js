import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import AddNumberModalForm from './AddNumberModalForm/AddNumberModalForm'

import './style.css'

class TrainNumbers extends React.Component {

    handleNumberSelect(row, isSelected) {
        if (isSelected) {
            this.props.selectNumber(row.number);
        }
        else {
            this.props.selectNumber(null);
        }

        return true;
    }

    handleDeleteNumber() {
        if (this.props.selectedNumber != null) {
            this.props.deleteNumber(this.props.selectedNumber);
            this.props.selectNumber(null);
        }
    }

    render() {

        const selectRow = {
            mode: 'radio',
            onSelect: (row, isSelected, e) => {this.handleNumberSelect(row, isSelected, e)},
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            hideSelectColumn: true
        };

        const options = {
            noDataText: "Ни один номер не указан",
            handleConfirmDeleteRow(next) {
                next();
            }
        };

        return (
            <div>
                <div>
                    <label className="control-label">Номера вагонов</label>
                </div>
                <div className="button-container">
                    <input
                        type="button"
                        value="Добавить"
                        className="btn btn-primary action-button"
                        onClick={this.props.showAddNumberModalForm} />
                    <AddNumberModalForm />
                    <input
                        type="button"
                        value="Удалить"
                        className="btn btn-danger action-button"
                        onClick={() => {this.handleDeleteNumber()}} />
                </div>
                <BootstrapTable
                    data={this.props.numbers}
                    selectRow={selectRow}
                    options={options}
                    striped
                    hover >
                    <TableHeaderColumn
                        isKey
                        dataField="number">Номера вагонов
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        numbers: state.waybillRegistrationForm.transportNumbers.numbers,
        selectedNumber: state.waybillRegistrationForm.transportNumbers.selectedNumber
    }
}

export default connect(mapStateToProps, Actions)(TrainNumbers);