import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link, browserHistory} from 'react-router';
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import SimpleInput from '../../components/SimpleInput/SimpleInput'
import {RadioGroup, Radio} from 'react-radio-group'

class Clients extends React.Component {
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
        this.props.getClientList(pageNumber, this.props.page.itemsCountPerPage)
    }

    onPageLimitSelectChange() {
        this.refs.table.cleanSelected();
        this.props.getClientList(1, parseInt(this.refs.pageLimitSelect.value));
    }

    onInputValueChange = e => {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setFilterInputValue(nameField, value);
    };

    onBtnSaveClick() {
        browserHistory.push('/client');
    }

    onBtnDeleteClick() {
        let selectedRowKeys = this.refs.table.state.selectedRowKeys;
        if (selectedRowKeys.length == 0) {
            this.props.showDialog("Не выделена ни одна строка для удаления", '', []);
        } else {
            this.props.showDialog("Вы действительно хотите приостановаить деятельность выбранных компаний?", '', [
                {
                    btnStyle: "btn btn-success",
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
        this.props.setStatusRadioValue('2');
        this.props.setFilterInputValue('filterCompanyNameValue', '');
        this.props.setFilterInputValue('filterAddressValue', '');
        this.props.getClientList(1, this.props.page.itemsCountPerPage);
    }

    onBtnSearchClick() {
        this.props.getClientList(1, this.props.page.itemsCountPerPage);
    }

    onConfirmOkBtnClick() {
        this.props.closeDialog();
        this.props.deleteClients(this.refs.table.state.selectedRowKeys);
        this.refs.table.cleanSelected();
    }

    nameFormatter = (cell, row) => {
        return <Link to={"/client/" + cell}>{cell}</Link>
    };
    statusFormatter = (cell, row) => {
        let labelType = cell ? "label-success" : "label-danger";
        let labelText = cell ? "Активна" : 'Приостановлена';
        return <div className={'label ' + labelType}>{labelText}</div>
    };

    selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "rgb(238, 193, 213)",
    };

    toEmptyStringIfNull = element => {
        return element || '';
    };

    addPrefixIfNotEmpty = (element, prefix) => {
        return (element.length === 0 ? '' : prefix) + element
    };

    render() {
        let clientList = this.props.page.clientList.map((item, index) => {
            let country = this.toEmptyStringIfNull(item.country);
            let city = this.addPrefixIfNotEmpty(this.toEmptyStringIfNull(item.city), ' г. ');
            let street = ' ' + this.toEmptyStringIfNull(item.street);
            let home = this.addPrefixIfNotEmpty(this.toEmptyStringIfNull(item.home), ' д. ');
            let room = this.addPrefixIfNotEmpty(this.toEmptyStringIfNull(item.room), ' кв. ');
            return {
                rowNumber: ((this.props.page.activePage - 1) * this.props.page.itemsCountPerPage) + index + 1,
                name: item.name,
                address: country + city + street + home + room,
                status: item.active
            }
        });

        return (
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
                            <div className="panel-heading">Поиск компании</div>
                            <div className="panel-body">
                                <SimpleInput id="filterCompanyNameValue"
                                             label="Название компании"
                                             value={this.props.frontend.filterCompanyNameValue}
                                             onChange={this.onInputValueChange} />
                                <SimpleInput id="filterAddressValue"
                                             label="Адрес"
                                             value={this.props.frontend.filterAddressValue}
                                             onChange={this.onInputValueChange} />
                                <label>Статус</label>
                                <RadioGroup name="companyStatus"
                                            selectedValue={this.props.frontend.statusRadioValue}
                                            onChange={newVal => this.props.setStatusRadioValue(newVal)}>
                                    <Radio value="2" />Любой <br/>
                                    <Radio value="1" />Активна <br/>
                                    <Radio value="0" />Приостановлена <br/>
                                </RadioGroup>
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
                            <BootstrapTable data={clientList} selectRow={this.selectRowProp} striped={true} hover={true}
                                            ref="table">
                                <TableHeaderColumn headerAlign="center" dataField="rowNumber" width="60">№</TableHeaderColumn>
                                <TableHeaderColumn headerAlign="center" dataField="name" isKey={true}
                                                   dataFormat={this.nameFormatter}>Название
                                    компании</TableHeaderColumn>
                                <TableHeaderColumn headerAlign="center" dataField="address">Адрес</TableHeaderColumn>
                                <TableHeaderColumn headerAlign="center" dataAlign="center" dataField="status"
                                                   width="150"
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
                                type={this.props.alert.type}
                    />
                </div> /*div.row end*/
        )
    }
}


const mapStateToProps = (state) => {
    return {
        page: state.clientListReducer.page,
        alert: state.clientListReducer.alert,
        frontend: state.clientListReducer.frontend
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClientList: (pageNumber, itemsCountPerPage) => {
            dispatch(clientListActionCreator.getClientList(pageNumber, itemsCountPerPage))
        },
        showDialog: (text, type, buttons) => {
            dispatch(clientListActionCreator.showDialog(text, type, buttons))
        },
        closeDialog: () => {
            dispatch(clientListActionCreator.closeDialog())
        },
        deleteClients: clientNamesList => {
            dispatch(clientListActionCreator.deleteClients(clientNamesList))
        },
        setStatusRadioValue: value => {
            dispatch(clientListActionCreator.setStatusRadioValue(value))
        },
        setFilterInputValue: (inputId, value) => {
            dispatch(clientListActionCreator.setFilterInputValue(inputId, value))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);
