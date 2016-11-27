import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'

const DateInput = (props) => {
    return (
        <div className="form-group above-calendar">
            <label className="control-label">{props.label}</label>
            <DatePicker
                value={props.value}
                onChange={(value, formattedValue) => {props.onChange(formattedValue)}} />
        </div>
    )
};

export default DateInput;