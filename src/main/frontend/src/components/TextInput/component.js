import React from 'react'

const TextInput = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <input
                type="text"
                name={props.name}
                className="form-control"
                onChange={(event) => props.onChange(event.target.value)} />
        </div>
    )
};

export default TextInput;