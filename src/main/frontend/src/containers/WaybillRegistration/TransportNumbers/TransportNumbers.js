import React from 'react'

import TrainNumbers from './TrainNumbers/TrainNumbers'
import CarNumbers from './CarNumbers/CarNumbers'

class TransportNumbers extends React.Component {

    renderTransportNumbersLayout() {
        switch (this.props.transportType) {
            case 'TRAIN':
                return (
                    <TrainNumbers />
                );
            case 'CAR':
                return (
                    <CarNumbers />
                );
            default:
                return (
                    <div>default</div>
                );
        }
    }

    render() {
        return (
            <div className="form-group">
                <label className="control-label">Номера транспортных средств</label>
                {this.renderTransportNumbersLayout()}
                <BootstrapTable
                    data={[]}
                    selectRow={{
                                mode: "checkbox",
                                clickToSelect: true,
                                bgColor: "rgb(238, 193, 213)",
                                hideSelectColumn: true
                            }}
                    options={{
                                noDataText: "Ни один номер не указан",
                                handleConfirmDeleteRow(next, dropRowKeys) {
                                    next();
                                }
                            }}
                    striped hover insertRow deleteRow >
                    <TableHeaderColumn isKey dataField="number">Номер</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default TransportNumbers;