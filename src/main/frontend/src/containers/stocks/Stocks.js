import React from 'react';
import {stockListActionCreator} from "./index";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router'

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onPageLimitSelectChange = this.onPageLimitSelectChange.bind(this);
    }
    componentWillMount() {
        this.props.getStockList(this.props.page.activePage, this.props.page.itemsCountPerPage);
    }

    onPaginationChange(pageNumber) {
        this.props.getStockList(pageNumber, this.props.page.itemsCountPerPage)
    }

    onPageLimitSelectChange() {
        this.props.getStockList(1, parseInt(this.refs.pageLimitSelect.value));
     }

    onTableRowSelect(row, isSelected) {
        console.log(row);
        console.log("selected: " + isSelected)
    }

    onSelectAllRows(isSelected) {
        console.log("is select all: " + isSelected);
    }

    nameFormatter = (cell, row) => {
        return <Link to={"/stock/" + cell}>{cell}</Link>
    };


    selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "rgb(238, 193, 213)",
        onSelect: this.onTableRowSelect,
        onSelectAll: this.onSelectAllRows
    };

    render() {
        var stockList = this.props.page.stockList.map((item, index) => {
            return {
                rowNumber: index,
                name: item.id,
                company: item.nameCompany,
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
                                    <button className="btn btn-default">Добавить</button>
                                    <button className="btn btn-default">Удалить</button>
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
                    </div>
                    <div className="col-xs-9">
                        <BootstrapTable data={stockList} selectRow={this.selectRowProp} striped={true} hover={true}>
                            <TableHeaderColumn headerAlign="center" dataField="rowNumber" isKey={true}>№</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="name"  dataFormat={this.nameFormatter}>Номер склада</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="address">Адрес</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="address">Адрес</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="company">Название компании</TableHeaderColumn>
                        </BootstrapTable>
                        <Pagination
                            activePage={this.props.page.activePage}
                            itemsCountPerPage={this.props.page.itemsCountPerPage}
                            totalItemsCount={this.props.page.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.onPaginationChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


    const mapStateToProps = (state) => {
    // console.log(state);
        return {
            page: state.stockListReducer.page
        }
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            getStockList: (pageNumber, itemsCountPerPage) => {
            dispatch(stockListActionCreator.getStockList(pageNumber, itemsCountPerPage))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stocks);
