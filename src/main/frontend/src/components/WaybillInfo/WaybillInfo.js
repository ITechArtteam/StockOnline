import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class WaybillInfo extends React.Component {
    render(){
        var products = this.props.data.productInWaybills.map((item, index) => {
            return {
                name: item.product.name,
                storage: item.product.storage.type,
                count: item.count
            }
        });

        return (
            <div className="row">
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">Накладная</div>
                        <div className="panel-body">
                            id: {this.props.data.id} <br/>
                            status: {this.props.data.status}
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Транспортное средство</div>
                        <div className="panel-body">
                            type: {this.props.data.transport.type} <br/>
                            number: {this.props.data.transport.number} <br/>
                            storage: {this.props.data.transport.storage.type}
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
    data: React.PropTypes.objectOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        status: React.PropTypes.number.isRequired,
        productInWaybills: React.PropTypes.arrayOf(React.PropTypes.shape({
            count: React.PropTypes.number.isRequired,
            product: React.PropTypes.objectOf(React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                storage: React.PropTypes.objectOf(React.PropTypes.shape({
                    type: React.PropTypes.string.isRequired
                })).isRequired
            })).isRequired,
        })).isRequired,
        transport: React.PropTypes.objectOf(React.PropTypes.shape({
            type: React.PropTypes.number.isRequired,
            number: React.PropTypes.string.isRequired,
            storage: React.PropTypes.objectOf(React.PropTypes.shape({
                type: React.PropTypes.string.isRequired
            })).isRequired
        })).isRequired
    })).isRequired
};

export default WaybillInfo;



