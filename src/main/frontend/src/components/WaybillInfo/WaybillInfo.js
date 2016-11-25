import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class WaybillInfo extends React.Component {
    render(){
        let products = [];
        if(!!this.props.data.productInWaybills) {
            products = this.props.data.productInWaybills.map((item, index) => {
                return {
                    name: item.product.name,
                    storage: item.product.storage.type,
                    count: item.count + ' ' + item.product.unit
                }
            });
        }

        return (
            <div className={this.props.visible ? "row" : "none"}>
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">Накладная</div>
                        <div className="panel-body">
                            Номер: {this.props.data.id} <br/>
                            Статус: {this.props.data.status}
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Транспортное средство</div>
                        <div className="panel-body">
                            Тип: {this.props.data.transport.type} <br/>
                            Номер: {this.props.data.transport.number} <br/>
                            Требования к хранению: {this.props.data.transport.storage.type}
                        </div>
                    </div>
                </div>
                <div className="col-xs-8">
                    <BootstrapTable data={products} striped={true}>
                        <TableHeaderColumn headerAlign="center" dataField="name" isKey={true}>Наименование</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="storage">Требование к хранению</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" dataField="count">Количество</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}

WaybillInfo.PropTypes = {
    visible: React.PropTypes.bool.isRequired,
    data: React.PropTypes.objectOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        status: React.PropTypes.string.isRequired,
        productInWaybills: React.PropTypes.arrayOf(React.PropTypes.shape({
            count: React.PropTypes.number.isRequired,
            product: React.PropTypes.objectOf(React.PropTypes.shape({
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

export default WaybillInfo;



