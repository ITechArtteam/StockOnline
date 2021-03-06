import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class WaybillInfo extends React.Component {
    concatFullName = (firstName, lastName, patronymic) => {
        let fn = firstName === null ? '' : firstName;
        let ln = lastName === null ? '' : lastName;
        let pt = patronymic === null ? '' : patronymic;

        let result = `${ln} ${fn} ${pt}`;
        result = result.trim();
        return result.length === 0 ? "Не указано" : result;
    };

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
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">Водитель</div>
                        <div className="panel-body">
                            <b>Номер паспорта:</b> <span className="pull-right">{this.props.data.transport.driver.passportNumber}</span> <br/>
                            <b>ФИО:</b> <span className="pull-right">{this.concatFullName(this.props.data.transport.driver.firstName,
                            this.props.data.transport.driver.lastName, this.props.data.transport.driver.patronymic)}</span>  <br/>
                            <b>Дата рождения:</b> <span className="pull-right">{this.props.data.transport.driver.birthDate}</span>
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
            driver: React.PropTypes.objectOf(React.PropTypes.shape({
                passportNumber: React.PropTypes.string.isRequired,
                firstName: React.PropTypes.string.isRequired,
                lastName: React.PropTypes.string.isRequired,
                patronymic: React.PropTypes.string.isRequired,
                birthDate: React.PropTypes.string.isRequired,
            }))
        })).isRequired
    })).isRequired
};

export default WaybillInfo;



