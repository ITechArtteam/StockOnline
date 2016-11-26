import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'

const DateInput = (props) => {
    return (
        <div className="form-group above-calendar">
            <label className="control-label">{props.label}</label>
            <DatePicker />
        </div>
    )
};

export default DateInput;