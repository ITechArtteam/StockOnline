import React from 'react'
import { connect } from 'react-redux'
import {stockActionCreator} from "./../index";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

import AddRoomModalForm from './addRoomModalForm/AddRoomModalForm'


class Rooms extends React.Component {

    handleRoomSelect(room, isSelected) {
        if (isSelected) {
            this.props.selectRoom(room.number);
        }
        else {
            this.props.selectRoom(null);
        }

        return true;
    }

    handleRoomDelete() {
        if (this.props.selectedRoomName !== null) {
            this.props.deleteRoom(this.props.selectedRoomName);
            this.props.selectRoom(null);
        }
    }

    handleAddRoomButtonClick() {
        this.props.changeRoomNumber('');
        this.props.changeRoomCost('');
        this.props.selectRoomUnit(null);
        this.props.changeRoomStorage('');

        this.props.showAddRoomModalForm();
    }

    render() {
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelected) => {this.handleRoomSelect(row, isSelected)},
            bgColor: "rgb(238, 193, 213)",
            hideSelectColumn: true
        };

        const options = {
            noDataText: "Помещение не указано",
            handleConfirmDeleteRow(next, dropRowKeys) {
                next();
            }
        };

        return (
            <div className="form-group">
                <label className="control-label">Описание помещений</label>
                <div className="button-container">
                    <input
                        type="button"
                        className="btn btn-primary action-button"
                        value="Добавить"
                        onClick={() => { this.handleAddRoomButtonClick() }}/>
                    <AddRoomModalForm />
                    <input
                        type="button"
                        className="btn btn-danger action-button"
                        value="Удалить"
                        onClick={() => {this.handleRoomDelete()}} />
                </div>
                <BootstrapTable
                    data={this.props.rooms}
                    selectRow={selectRow}
                    options={options}
                    striped
                    hover>
                    <TableHeaderColumn isKey dataSort dataField="number" >Номер помещение</TableHeaderColumn>
                    <TableHeaderColumn dataField="cost" >Стоимость хранения</TableHeaderColumn>
                    <TableHeaderColumn dataField="storage">Способ хранения товаров</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        rooms: state.stock.data.stockRooms.rooms,
        selectedRoomName: state.stock.data.stockRooms.selectedRoomName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeRoomNumber:(number) => {
            dispatch(stockActionCreator.changeRoomNumber(number))
        },
        changeRoomCost:(cost) => {
            dispatch(stockActionCreator.changeRoomCost(cost))
        },
        changeRoomStorage:(storage) => {
            dispatch(stockActionCreator.changeRoomStorage(storage))
        },
        selectRoom:(number) => {
            dispatch(stockActionCreator.selectRoom(number))
        },
        deleteRoom:(number) => {
            dispatch(stockActionCreator.deleteRoom(number))
        },
        selectRoomUnit:(unit) => {
            dispatch(stockActionCreator.selectRoomUnit(unit))
        },
        setUnits:(units) => {
            dispatch(stockActionCreator.setUnits(units))
        },
        showAddRoomModalForm:() => {
            dispatch(stockActionCreator.showAddRoomModalForm())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);