import React from 'react'

import TrainNumbers from './TrainNumbers/TrainNumbers'
import CarNumbers from './CarNumbers/CarNumbers'
import DefaultTransportNumber from './DefaultTransportNumber/DefaultTransportNumber'

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
                return '';
        }
    }

    render() {
        return (
            <div className="form-group">
                {this.renderTransportNumbersLayout()}
            </div>
        )
    }
}

export default TransportNumbers;