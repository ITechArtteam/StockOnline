import React from 'react'

const TextInput = (props) => {
    return (
        <div className={'form-group' + (props.resultType ? ' has-' + props.resultType : '')}>
            <label className="control-label">{props.label}</label>
            <input
                type="text"
                name={props.name}
                value={props.value}
                className={'form-control' + (props.resultType ? ' form-control-' + props.resultType : '')}
                onChange={(event) => props.onChange(event.target.value)}
                onBlur={props.onBlur} />
        </div>
    )
};

export default TextInput;