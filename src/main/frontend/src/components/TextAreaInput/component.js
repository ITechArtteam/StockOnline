import React from 'react'

import './style.css'

const TextAreaInput = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
                <textarea
                    className="form-control disabled-resizing"
                    onChange={props.onChange}
                    value={props.value}
                />
        </div>
    )
};

export default TextAreaInput;