import React from 'react'
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {distributionGoodsActionCreator} from "../index";
import SelectShelfModal from "../selectShelfModal/SelectShelfModal"

class WaybillInfo extends React.Component {
    constructor(props) {
        super(props);
        this.placesFormatter = this.placesFormatter.bind(this);
    }

    concatFullName(firstName, lastName, patronymic) {
        let fn = firstName === null ? '' : firstName;
        let ln = lastName === null ? '' : lastName;
        let pt = patronymic === null ? '' : patronymic;

        let result = `${ln} ${fn} ${pt}`;
        result = result.trim();
        return result.length === 0 ? "Не указано" : result;
    }

    placesFormatter(cell, rowUpper) {
        let shelfFormatter = (cell, row) => {
            return <span>{cell}<a href="#" className="pull-right" onClick={() => this.props.removeProductFromShelf(rowUpper.index, row.shelfId)}>X</a></span>
        };
        shelfFormatter.bind(this);
        return <div>
            <div className="before-table">
                <button type="button"
                        className="btn btn-default btn-xs btn-block"
                        onClick={() => this.props.showAddModal(rowUpper.index)}
                        disabled={this.props.waybill.productInWaybills[rowUpper.index].count !== this.props.waybill.productInWaybills[rowUpper.index].placedCount ? "" : "disabled"}
                >
                    Добавить
                </button>
            </div>
            <BootstrapTable data={rowUpper.places} striped={true}>
                <TableHeaderColumn dataField="shelfId" isKey={true} hidden={true}>id</TableHeaderColumn>
                <TableHeaderColumn dataField="number" dataFormat={shelfFormatter}>Номер</TableHeaderColumn>
                <TableHeaderColumn dataField="count">Кол-во</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }

    render(){
        let products = [];
        if(!!this.props.data.productInWaybills) {
            products = this.props.data.productInWaybills.map((item, index) => {
                return {
                    index: index,
                    name: item.product.name,
                    storage: item.product.storage.type,
                    count: `${item.placedCount}/${item.count}`,
                    unit: item.product.unit,
                    places: item.product.places
                }
            });
        }

        return (
            <div className={this.props.visible ? "row" : "none"}>
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">Накладная</div>
                        <div className="panel-body">
                            <b>Номер:</b> <span className="pull-right">{this.props.data.number}</span> <br/>
                            <b>Статус:</b> <span className="pull-right">{this.props.data.status}</span> <br/>
                            <b>Дата регистрации:</b> <span className="pull-right">{this.props.data.registrationDate}</span> <br/>
                        </div>
                        <div className="panel-heading">Оформил:</div>
                        <div className="panel-body">
                            <b>Пользователь:</b> <span className="pull-right">{this.props.data.registeredBy.login}</span> <br/>
                            <b>ФИО:</b>  <span className="pull-right">{this.concatFullName(this.props.data.registeredBy.name,
                            this.props.data.registeredBy.surname,
                            this.props.data.registeredBy.patronymic)}</span>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Транспортное средство</div>
                        <div className="panel-body">
                            <b>Тип:</b> <span className="pull-right">{this.props.data.transport.type}</span> <br/>
                            <b>Номер:</b> <span className="pull-right">{this.props.data.transport.number}</span>  <br/>
                            <b>Требования к хранению:</b> <span className="pull-right">{this.props.data.transport.storage.type}</span>
                        </div>
                    </div>
                </div>
                <div className="col-xs-8">
                    <BootstrapTable data={products} striped={true}>
                        <TableHeaderColumn headerAlign="center" dataField="name" isKey={true}>Наименование</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="storage">Требование к хранению</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="count">Размещено/Количество</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="unit" width="50">Ед. измер.</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataFormat={this.placesFormatter}>Список мест</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <SelectShelfModal/>
            </div>
        )
    }
}

WaybillInfo.PropTypes = {
    visible: React.PropTypes.bool.isRequired,
    data: React.PropTypes.objectOf(React.PropTypes.shape({
        number: React.PropTypes.number.isRequired,
        status: React.PropTypes.string.isRequired,
        registrationDate: React.PropTypes.string.isRequired,
        registeredBy: React.PropTypes.objectOf(React.PropTypes.shape({
            login: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            surname: React.PropTypes.string.isRequired,
            patronymic: React.PropTypes.string.isRequired,
        })),
        productInWaybills: React.PropTypes.arrayOf(React.PropTypes.shape({
            count: React.PropTypes.number.isRequired,
            product: React.PropTypes.objectOf(React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                name: React.PropTypes.string.isRequired,
                unit: React.PropTypes.string.isRequired,
                storage: React.PropTypes.objectOf(React.PropTypes.shape({
                    type: React.PropTypes.string.isRequired
                })).isRequired
            })).isRequired,
        })).isRequired,
        transport: React.PropTypes.objectOf(React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            number: React.PropTypes.string.isRequired,
            storage: React.PropTypes.objectOf(React.PropTypes.shape({
                type: React.PropTypes.string.isRequired
            })).isRequired
        })).isRequired
    })).isRequired
};


const mapStateToProps = (state) => {
    return {
        frontend: state.distributionGoodsReducer.frontend,
        alert: state.distributionGoodsReducer.alert,
        waybill: state.distributionGoodsReducer.waybill,
        selectShelfModal: state.distributionGoodsReducer.selectShelfModal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAddModal: (rowIndex) => {
            dispatch(distributionGoodsActionCreator.setShelfModalVisibility(true, rowIndex))
        },
        removeProductFromShelf: (rowIndex, shelfId) => {
            dispatch(distributionGoodsActionCreator.removeProductFromShelf(rowIndex, shelfId))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WaybillInfo);





