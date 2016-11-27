import React from 'react'

import DisabledInput from '../../../components/DisabledInput/DisabledInput'

const DriverInfo = (props) => {

    return (
        <div>
            <DisabledInput
                label="Водитель транспортного средства"
                value={props.driver.lastName + ' ' +
                       props.driver.firstName + ' ' +
                       props.driver.patronymic} />
            <DisabledInput
                label="Номер паспорта"
                value={props.driver.passportNumber} />
        </div>
    )
};

export default DriverInfo;