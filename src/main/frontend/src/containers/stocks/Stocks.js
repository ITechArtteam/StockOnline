import React from 'react';
import {stockListActionCreator} from "./index";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router'

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChanged = this.onPaginationChanged.bind(this);
    }
    componentWillMount() {
        this.props.getStockList(this.props.page.activePage, this.props.page.itemsCountPerPage);
    }

    onPaginationChanged(pageNumber) {
        this.props.getStockList(pageNumber, this.props.page.itemsCountPerPage)
    }

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
        function onRowSelect(row, isSelected){
            console.log(row);
            console.log("selected: " + isSelected)
        }

        function onSelectAll(isSelected){
            console.log("is select all: " + isSelected);
        }
        var nameFormatter = (cell, row) => {
            return <Link to={"/stock/" + cell}>{cell}</Link>
        };
        var statusFormatter = (cell, row) => {
            var labelType = cell ? "label-success" : "label-danger";
            var labelText = cell ? "Активна" : 'Приостановлена';
            return <div className={'label ' + labelType}>{labelText}</div>
        };

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: onRowSelect,
            onSelectAll: onSelectAll
        };

        return (
            <div className="row">
            {/*<StockTable stockList={this.props.page.stockList}/>*/}
                <BootstrapTable data={stockList} selectRow={selectRowProp} striped={true} hover={true}>
                    <TableHeaderColumn headerAlign="center" dataField="rowNumber" isKey={true}>№</TableHeaderColumn>
                    <TableHeaderColumn headerAlign="center" dataField="name" dataFormat={nameFormatter}>Номер склада</TableHeaderColumn>
                    <TableHeaderColumn headerAlign="center" dataField="company">Название компании</TableHeaderColumn>
                    <TableHeaderColumn headerAlign="center" dataField="address">Адрес</TableHeaderColumn>
                </BootstrapTable>
    <Pagination
        activePage={this.props.page.activePage}
        itemsCountPerPage={this.props.page.itemsCountPerPage}
        totalItemsCount={this.props.page.totalItemsCount}
        pageRangeDisplayed={5}
        onChange={this.onPaginationChanged}
    />
        Записей на странице:
            <select className="form-control"
        ref={'pageLimitSelect'}
        onChange={() => this.props.getStockList(1, parseInt(this.refs.pageLimitSelect.value))}>
    <option>5</option>
        <option>10</option>
        </select>
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
