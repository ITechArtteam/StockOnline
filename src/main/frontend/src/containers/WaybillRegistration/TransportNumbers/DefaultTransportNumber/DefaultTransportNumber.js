import React from 'react'

import TextInput from '../../../../components/TextInput/TextInput'

class DefaultTransportNumber extends React.Component {

    render() {

        return (
            <div>
                <TextInput
                    label="Номер транспортного средства" />
            </div>
        )
    }
}

export default DefaultTransportNumber;