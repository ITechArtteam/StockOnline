import React from 'react'

import TrainNumbers from './TrainNumbers/TrainNumbers'
import CarNumbers from './CarNumbers/CarNumbers'
import DefaultTransportNumber from './DefaultTransportNumber/DefaultTransportNumber'

class TransportNumbers extends React.Component {

    renderError() {
        if (this.props.error && (this.props.error != '')) {
            return (<div className="control-label text-danger">{this.props.error}</div>);
        }
        else {
            return (<div>&nbsp;</div>);
        }
    }

    renderFormGroupClassName() {
        if (this.props.error && (this.props.error != '')) {
            return 'form-group has-error';
        }
        else if (this.props.resultType && (this.props.resultType != '')) {
            return 'form-group has-' + this.props.resultType;
        }
        else {
            return 'form-group';
        }
    }

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
            <div className='form-group'>
                {this.renderTransportNumbersLayout()}
                {this.renderError()}
            </div>
        )
    }
}

export default TransportNumbers;