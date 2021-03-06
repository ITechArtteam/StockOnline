import React from 'react';
import {stockListActionCreator} from "./index";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link, browserHistory} from 'react-router';
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import SimpleInput from '../../components/SimpleInput/SimpleInput'
import {RadioGroup, Radio} from 'react-radio-group'

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onPageLimitSelectChange = this.onPageLimitSelectChange.bind(this);
        this.onBtnSaveClick = this.onBtnSaveClick.bind(this);
        this.onBtnDeleteClick = this.onBtnDeleteClick.bind(this);
        this.onConfirmOkBtnClick = this.onConfirmOkBtnClick.bind(this);
        this.onBtnClearFilterClick = this.onBtnClearFilterClick.bind(this);
        this.onBtnSearchClick = this.onBtnSearchClick.bind(this);
    }

    componentWillMount() {
        if (!!this.refs.table) this.refs.table.cleanSelected();
        this.onBtnClearFilterClick();
    }

    onPaginationChange(pageNumber) {
        this.refs.table.cleanSelected();
        this.props.getStockList(pageNumber, this.props.page.itemsCountPerPage)
    }

    onPageLimitSelectChange() {
        this.refs.table.cleanSelected();
        this.props.getStockList(1, parseInt(this.refs.pageLimitSelect.value));
     }

    onInputValueChange = e => {
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setFilterInputValue(nameField, value);
    };


    onBtnSaveClick() {
        browserHistory.push('/stock');
    }

    onBtnDeleteClick() {
        let selectedRowKeys = this.refs.table.state.selectedRowKeys;
        if(selectedRowKeys.length == 0) {
            this.props.showDialog("Не выделена ни одна строка для удаления", '', []);
        } else {
            this.props.showDialog("Вы действительно хотите удалить выбранные записи?", '', [
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
        }

    onBtnClearFilterClick() {
        this.props.setFilterInputValue('filterStockNameValue', '');
        this.props.setFilterInputValue('filterAddressValue', '');
        this.props.getStockList(1, this.props.page.itemsCountPerPage);
    }

    onBtnSearchClick() {
        this.props.getStockList(1, this.props.page.itemsCountPerPage);
    }

    onConfirmOkBtnClick() {
        this.props.closeDialog();
        this.props.deleteStocks(this.refs.table.state.selectedRowKeys);
        this.refs.table.cleanSelected();
    }

    nameFormatter = (cell, row) => {
        return <Link to={"/stock/" + cell}>{cell}</Link>
    };

    selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "rgb(238, 193, 213)"
    };

    toEmptyStringIfNull = element => {
        return element || '';
    };

    addPrefixIfNotEmpty = (element, prefix) => {
        return (element.length === 0 ? '' : prefix) + element
    };

    render() {
        let stockList = this.props.page.stockList.map((item, index) => {
        let country = this.toEmptyStringIfNull(item.country);
        let city = this.addPrefixIfNotEmpty(this.toEmptyStringIfNull(item.city), ' г. ');
        let street = ' ' + this.toEmptyStringIfNull(item.street);
        let home = this.addPrefixIfNotEmpty(this.toEmptyStringIfNull(item.home), ' д. ');
        return {
                rowNumber: ((this.props.page.activePage - 1) * this.props.page.itemsCountPerPage) + index + 1,
                id: item.id,
                name: item.name,
                company: item.nameCompany,
                address: country + city + street + home
                }
                });







        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">Количество записей на странице</div>
                            <div className="panel-body">
                                    <select className="form-control"
                                            ref={'pageLimitSelect'}
                                            id="pageLimitSelect"
                                            onChange={this.onPageLimitSelectChange}
                                            defaultValue={this.props.page.itemsCountPerPage}>
                                        <option>5</option>
                                        <option>10</option>
                                    </select>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">Действия</div>
                            <div className="panel-body">
                                    <button className="btn btn-default btn-block" onClick={this.onBtnSaveClick}>Создать</button>
                                    <button className="btn btn-default btn-block" onClick={this.onBtnDeleteClick}>Удалить</button>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">Поиск складов</div>
                            <div className="panel-body">
                                    <SimpleInput id="filterStockNameValue"
                                                 label="Склад"
                                                 value={this.props.frontend.filterStockNameValue}
                                                 onChange={this.onInputValueChange} />
                                    <SimpleInput id="filterAddressValue"
                                                 label="Адрес"
                                                 value={this.props.frontend.filterAddressValue}
                                                 onChange={this.onInputValueChange} />
                                    <button className="btn btn-default btn-block" onClick={this.onBtnSearchClick}>Поиск</button>
                                    <button className="btn btn-default btn-block" onClick={this.onBtnClearFilterClick}>Очистить фильтр</button>
                            </div>
                        </div>
                    </div> {/*dib.col-xs-3 end*/}
                    <div className="col-xs-9">
                        <div className={this.props.frontend.isFilterMessageVisible ? 'before-table' : 'none'}>
                            <span className="label label-success">
                            По вашему запросу найдено {this.props.page.totalItemsCount} записей
                            </span>
                        </div>
                        <BootstrapTable data={stockList} selectRow={this.selectRowProp} striped={true} hover={true} ref="table">
                            <TableHeaderColumn headerAlign="center" dataField="id" width="60" isKey={true}  dataFormat={this.nameFormatter} >Номер склада</TableHeaderColumn>
                            <TableHeaderColumn headerAlign="center" dataField="name" >Склад</TableHeaderColumn>
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
                    </div>{/*div.col-xs-9 end*/}
                    <AlertPopup close={this.props.closeDialog}
                        isVisible={this.props.alert.isVisible}
                        message={this.props.alert.text}
                        buttons={this.props.alert.buttons}
                        type={this.props.alert.type}
                    />
                </div>{/*div.row end*/}
            </div>
        )
    }
}


    const mapStateToProps = (state) => {
        return {
            page: state.stockListReducer.page,
            alert: state.stockListReducer.alert,
            frontend: state.stockListReducer.frontend
        }
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            getStockList: (pageNumber, itemsCountPerPage) => {
            dispatch(stockListActionCreator.getStockList(pageNumber, itemsCountPerPage))
            },
            showDialog: (text, type, buttons) => {
                dispatch(stockListActionCreator.showDialog(text, type, buttons))
            },

            closeDialog: () => {
                dispatch(stockListActionCreator.closeDialog())
            },
            deleteStocks: stockNamesList => {
                dispatch(stockListActionCreator.deleteStocks(stockNamesList))
            },
            setFilterInputValue: (inputId, value) => {
                dispatch(stockListActionCreator.setFilterInputValue(inputId, value))
            }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stocks);
