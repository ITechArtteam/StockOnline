import React from 'react';
import {waybillsActionCreator} from "./index";
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link, browserHistory} from 'react-router';
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import SimpleInput from '../../components/SimpleInput/SimpleInput'
import {RadioGroup, Radio} from 'react-radio-group'
import WaybillInfoModal from "./waybillInfoModal/WaybillInfoModal"

class Waybills extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onPageLimitSelectChange = this.onPageLimitSelectChange.bind(this);
        this.onBtnClearFilterClick = this.onBtnClearFilterClick.bind(this);
        this.onBtnSearchClick = this.onBtnSearchClick.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.numberFormatter = this.numberFormatter.bind(this);
    }

    componentWillMount() {
        this.onBtnClearFilterClick();
    }

    onPaginationChange(pageNumber) {
        this.props.getWaybills(pageNumber, this.props.page.itemsCountPerPage)
    }

    onPageLimitSelectChange() {
        this.props.getWaybills(1, parseInt(this.refs.pageLimitSelect.value));
    }

    onBtnClearFilterClick() {
        this.props.setWaybillTypeRadioValue('2');
        this.props.setFilterInputValue('filterWaybillNumberValue', '');
        this.props.getWaybills(1, this.props.page.itemsCountPerPage);
    }

    onBtnSearchClick() {
        this.props.getWaybills(1, this.props.page.itemsCountPerPage);
    }

    onInputValueChange(e) {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setFilterInputValue(nameField, value);
    };

    numberFormatter(cell, row) {
        return <a href="#" onClick={() => this.props.showWaybillInfoModal(cell)}>{cell}</a>
    };

    render(){
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
                        <div className="panel-heading">Поиск накладных</div>
                        <div className="panel-body">
                            <SimpleInput id="filterWaybillNumberValue"
                                         label="Номер накладной"
                                         value={this.props.frontend.filterWaybillNumberValue}
                                         onChange={this.onInputValueChange} />
                            <label>Тип</label>
                            {/*<RadioGroup name="waybillTypeValue"*/}
                                        {/*selectedValue={this.props.frontend.waybillTypeValue}*/}
                                        {/*onChange={newVal => this.props.setWaybillTypeRadioValue(newVal)}>*/}
                                {/*<Radio value="2" />Все <br/>*/}
                                {/*<Radio value="1" />Поступившие <br/>*/}
                                {/*<Radio value="0" />Выданные <br/>*/}
                            {/*</RadioGroup>*/}
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
                    <BootstrapTable data={this.props.page.waybills} striped={true} hover={true} ref="table">
                        <TableHeaderColumn headerAlign="center" dataField="number" isKey={true} dataFormat={this.numberFormatter}>Номер</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="registrationDate">Дата регистрации</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="status">Статус</TableHeaderColumn>
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
                            type={this.props.alert.type}/>
                <WaybillInfoModal/>
            </div> /*div.row end*/
        )
    }
}


const mapStateToProps = (state) => {
    return {
        page: state.waybillsReducer.page,
        alert: state.waybillsReducer.alert,
        frontend: state.waybillsReducer.frontend,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showDialog: (text, type, buttons) => {
            dispatch(waybillsActionCreator.showDialog(text, type, buttons));
        },
        closeDialog: () => {
            dispatch(waybillsActionCreator.closeDialog());
        },
        setWaybillTypeRadioValue: value => {
            dispatch(waybillsActionCreator.setWaybillTypeRadioValue(value));
        },
        setFilterInputValue: (inputId, value) => {
            dispatch(waybillsActionCreator.setFilterInputValue(inputId, value));
        },
        getWaybills: (pageNumber, itemsCountPerPage) => {
            dispatch(waybillsActionCreator.getWaybills(pageNumber, itemsCountPerPage))
        },
        showWaybillInfoModal: waybillNumber => {
            dispatch(waybillsActionCreator.setWaybillInfoModalData(waybillNumber));
            dispatch(waybillsActionCreator.setWaybillInfoModalVisibility(true));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Waybills);
