import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link, browserHistory} from 'react-router';
import AlertPopup from '../../components/AlertPopup/AlertPopup'

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onPageLimitSelectChange = this.onPageLimitSelectChange.bind(this);
        this.onBtnSaveClick = this.onBtnSaveClick.bind(this);
        this.onBtnDeleteClick = this.onBtnDeleteClick.bind(this);
        this.onConfirmOkBtnClick = this.onConfirmOkBtnClick.bind(this);
    }

    componentWillMount() {
        this.props.getClientList(1, this.props.page.itemsCountPerPage);
    }
    componentDidMount() {
        this.refs.table.cleanSelected();
    }

    onPaginationChange(pageNumber) {
        this.refs.table.cleanSelected();
        this.props.getClientList(pageNumber, this.props.page.itemsCountPerPage)
    }

    onPageLimitSelectChange() {
        this.refs.table.cleanSelected();
        this.props.getClientList(1, parseInt(this.refs.pageLimitSelect.value));
    }

    onBtnSaveClick() {
        browserHistory.push('/client');
    }

    onBtnDeleteClick() {
        var selectedRowKeys = this.refs.table.state.selectedRowKeys;
        if(selectedRowKeys.length == 0) {
            this.props.showDialog("Не выделена ни одна строка для удаления", []);
        } else {
            this.props.showDialog("Вы действительно хотите удалить выбранные записи?", [
                {
                    btnStyle : "btn btn-success",
                    text: "Ок",
                    onclick: this.onConfirmOkBtnClick
                },
                {
                    btnStyle: "btn btn-default",
                    text: "Отмена",
                    onclick: this.props.closeDialog
                }]);
        }
        console.log(this.refs.table.state);
    }

    onConfirmOkBtnClick() {
        this.props.closeDialog();
        this.props.deleteClients(this.refs.table.state.selectedRowKeys);
        this.props.getClientList(1, this.props.page.itemsCountPerPage);
        this.refs.table.cleanSelected();
    }

    onTableRowSelect(row, isSelected) {
        console.log(row);
        console.log("selected: " + isSelected)
    }

    onSelectAllRows(isSelected) {
        console.log("is select all: " + isSelected);
    }

    nameFormatter = (cell, row) => {
        return <Link to={"/client/" + cell}>{cell}</Link>
    };
    statusFormatter = (cell, row) => {
        var labelType = cell ? "label-success" : "label-danger";
        var labelText = cell ? "Активна" : 'Приостановлена';
        return <div className={'label ' + labelType}>{labelText}</div>
    };

    selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "rgb(238, 193, 213)",
        onSelect: this.onTableRowSelect,
        onSelectAll: this.onSelectAllRows
    };

    render() {
        var clientList = this.props.page.clientList.map((item, index) => {
            return {
                rowNumber: ((this.props.page.activePage - 1) * this.props.page.itemsCountPerPage) + index + 1,
                name: item.name,
                address: item.country + ' г. ' + item.city + ' ул. ' + item.street + ' д. ' + item.home + ' кв. ' + item.room,
                status: item.active
            }
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-3">
                        <div className="list-group">
                            <div className="list-group-item">
                                <div className="btn-group-vertical">
                                    <button className="btn btn-default" onClick={this.onBtnSaveClick}>Создать</button>
                                    <button className="btn btn-default" onClick={this.onBtnDeleteClick}>Удалить</button>
                                    <button className="btn btn-default">Поиск</button>
                                    <button className="btn btn-default">Очистить фильтр</button>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="pageLimitSelect">Записей на странице:</label>
                                        <select className="form-control"
                                                ref={'pageLimitSelect'}
                                                id="pageLimitSelect"
                                                onChange={this.onPageLimitSelectChange}>
                                            <option>5</option>
                                            <option>10</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*dib.col-xs-3 end*/}
                    </div>

                    <div className="col-xs-9">
                        <BootstrapTable data={clientList} selectRow={this.selectRowProp} striped={true} hover={true} ref="table">
                            <TableHeaderColumn headerAlign="center" dataField="rowNumber">№</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="name" isKey={true} dataFormat={this.nameFormatter}>Название
                                компании</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="address">Адрес</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataAlign="center" dataField="status"
                                               dataFormat={this.statusFormatter}>Статус</TableHeaderColumn>
                        </BootstrapTable>
                        <Pagination
                            activePage={this.props.page.activePage}
                            itemsCountPerPage={this.props.page.itemsCountPerPage}
                            totalItemsCount={this.props.page.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.onPaginationChange}
                        />
                    </div>{/*div.col-xs-9 end*/}
                    <AlertPopup close={this.props.closeDialog}
                                isVisible={this.props.alert.isVisible}
                                message={this.props.alert.text}
                                buttons={this.props.alert.buttons}
                    />
                </div>{/*div.row end*/}
            </div>/*div.container end*/
        )
    }
}


const mapStateToProps = (state) => {
    return {
        page: state.clientListReducer.page,
        alert: state.clientListReducer.alert,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClientList: (pageNumber, itemsCountPerPage) => {
            dispatch(clientListActionCreator.getClientList(pageNumber, itemsCountPerPage))
        },
        showDialog: (text, buttons) => {
            dispatch(clientListActionCreator.showDialog(text, buttons))
        },
        closeDialog: () => {
            dispatch(clientListActionCreator.closeDialog())
        },
        deleteClients: clientNamesList => {
            dispatch(clientListActionCreator.deleteClients(clientNamesList))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);
