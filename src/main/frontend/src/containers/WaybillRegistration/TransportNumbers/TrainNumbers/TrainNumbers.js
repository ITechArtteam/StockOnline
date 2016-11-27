import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import './style.css'

class TrainNumbers extends React.Component {

    handleNumberSelect(row, isSelected, e) {


        return true;
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
                        className="btn btn-primary action-button" />
                    <input
                        type="button"
                        value="Удалить"
                        className="btn btn-danger action-button" />
                </div>
                <BootstrapTable
                    data={[]}
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