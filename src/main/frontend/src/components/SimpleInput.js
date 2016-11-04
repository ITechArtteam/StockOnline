import React from 'react'

class SimpleInput extends React.Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
                <div className="col-sm-10">
                    <input type={this.props.type} onChange={this.props.onChange} ref="input"
                           className="form-control" id={this.props.id} autoComplete="false" value={this.props.value}/>
                </div>
            </div>
        )
    }
}

SimpleInput.defaultProps = {
    type: "text"
};
export default SimpleInput;
