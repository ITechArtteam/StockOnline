import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import TextInput from '../../../../components/TextInput/TextInput'

import {
    checkCarNumber,
    checkTrailerNumber
} from './validation'

class CarNumbers extends React.Component {

    render() {
        return (
            <div>
                <TextInput
                    label="Номер автомобиля"
                    value={this.props.carNumber}
                    error={this.props.carNumberError}
                    onChange={this.props.changeCarNumber}
                    onBlur={() => {this.props.setCarNumberError(checkCarNumber(this.props.carNumber))}} />
                <TextInput
                    label="Номер прицепа"
                    value={this.props.trailerNumber}
                    error={this.props.trailerNumberError}
                    onChange={this.props.changeTrailerNumber}
                    onBlur={() => {this.props.setTrailerNumberError(checkTrailerNumber(this.props.trailerNumber))}} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        carNumber: state.waybillRegistrationForm.transportNumbers.car,
        trailerNumber: state.waybillRegistrationForm.transportNumbers.trailer,
        carNumberError: state.waybillRegistrationForm.transportNumbers.validationErrors.carNumberError,
        trailerNumberError: state.waybillRegistrationForm.transportNumbers.validationErrors.trailerNumberError
    }
}

export default connect(mapStateToProps, Actions)(CarNumbers);