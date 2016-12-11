import React from 'react'
import { connect } from 'react-redux'
import {stockActionCreator} from "./../../index";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import AddShelfModalForm from './addShelfModalForm/AddShelfModalForm'


class Shelfs extends React.Component {

    handleShelfSelect(shelf, isSelected) {
        if (isSelected) {
            this.props.selectShelf(shelf.number);
        }
        else {
            this.props.selectShelf(null);
        }

        return true;
    }

    handleShelfDelete() {
        if (this.props.selectedShelfName !== null) {
            this.props.deleteShelf(this.props.selectedShelfName);
            this.props.selectShelf(null);
        }
    }

    handleAddShelfButtonClick() {
        if (this.props.stockRooms !== null){
            this.props.changeShelfNumber('');
            this.props.changeShelfCapacity('');
            this.props.selectShelfUnit(null);
        }
        this.props.showAddShelfModalForm();
    }

    render() {
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelected) => {this.handleShelfSelect(row, isSelected)},
            bgColor: "rgb(238, 193, 213)",
            hideSelectColumn: true
        };

        const options = {
            noDataText: "Место хранение не найден",
            handleConfirmDeleteRow(next, dropRowKeys) {
                next();
            }
        };

        return (
            <div className="form-group">
                <label className="control-label">Описание места хранение</label>
                <div className="button-container">
                    <input
                        type="button"
                        className="btn btn-primary action-button"
                        value="Добавить"
                        onClick={() => { this.handleAddShelfButtonClick() }}/>
                    <AddShelfModalForm />
                    <input
                        type="button"
                        className="btn btn-danger action-button"
                        value="Удалить"
                        onClick={() => {this.handleShelfDelete()}} />
                </div>
                <BootstrapTable
                    data={this.props.shelfs}
                    selectRow={selectRow}
                    options={options}
                    striped
                    hover>
                    <TableHeaderColumn isKey dataSort dataField="number" >Номер места хранение</TableHeaderColumn>
                    <TableHeaderColumn dataField="capacity" >Вместимость</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        rooms: (!!state.stock.data.stockRooms) ? state.stock.data.stockRooms.rooms: [],
        shelfs:            (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.shelfs           : [],
        selectedShelfName: (!!state.stock.data.stockRooms.addRoomModalForm) ? state.stock.data.stockRooms.addRoomModalForm.selectedRoomName : null,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeShelfNumber:(number) => {
            dispatch(stockActionCreator.changeShelfNumber(number))
        },
        changeShelfCapacity:(capacity) => {
            dispatch(stockActionCreator.changeShelfCapacity(capacity))
        },
        selectShelf:(number) => {
            dispatch(stockActionCreator.selectShelf(number))
        },
        deleteShelf:(number) => {
            dispatch(stockActionCreator.deleteShelf(number))
        },
        selectShelfUnit:(unit) => {
            dispatch(stockActionCreator.selectShelfUnit(unit))
        },
        showAddShelfModalForm:() => {
            dispatch(stockActionCreator.showAddShelfModalForm())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Shelfs);