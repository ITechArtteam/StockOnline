import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import TextInput from '../../../../components/TextInput/TextInput'

class CarNumbers extends React.Component {

    render() {
        return (
            <div>
                <TextInput
                    label="Номер автомобиля"
                    value={this.props.carNumber}
                    onChange={this.props.changeCarNumber} />
                <TextInput
                    label="Номер прицепа"
                    value={this.props.trailerNumber}
                    onChange={this.props.changeTrailerNumber} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        carNumber: state.waybillRegistrationForm.transportNumbers.car,
        trailerNumber: state.waybillRegistrationForm.transportNumbers.trailer
    }
}

export default connect(mapStateToProps, Actions)(CarNumbers);