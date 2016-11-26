import React from 'react'

import Select from 'react-select';
import '../../../node_modules/react-select/dist/react-select.css';

const SelectInput = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <Select
                value={props.value}
                options={props.options}
                onChange={(value) => {props.onChange(value)}}
                placeholder={props.label} />
        </div>
    )
};

export default SelectInput;