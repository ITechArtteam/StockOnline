import React from 'react'

import DisabledInput from '../../../components/DisabledInput/DisabledInput'

const DriverInfo = (props) => {

    if (props.transportType !== 'CAR') {
        return (<div></div>)
    }
    else {
        return (
            <div>
                <DisabledInput
                    label="ФИО водителя"
                    value={props.driver.lastName + ' ' +
                       props.driver.firstName + ' ' +
                       props.driver.patronymic} />
                <DisabledInput
                    label="Номер паспорта водителя"
                    value={props.driver.passportNumber} />
            </div>
        )
    }
};

export default DriverInfo;