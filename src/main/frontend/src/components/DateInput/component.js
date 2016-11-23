import React from 'react'

import Calendar from 'react-input-calendar'
import 'react-input-calendar/style/index.css'

const DateInput = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <Calendar format={props.format} />
        </div>
    )
};

export default DateInput;