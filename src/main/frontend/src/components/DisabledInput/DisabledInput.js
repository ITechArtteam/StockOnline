import React from 'react'

const DisabledInput = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <input
                type="text"
                className="form-control"
                value={props.value}
                disabled />
        </div>
    )
};

export default DisabledInput;