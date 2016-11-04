import React from 'react'
import './style.css';

class SimpleInput extends React.Component {

    render() {
        return (
            <div className="form-group" >
                <label htmlFor={this.props.id}
                       className="col-sm-3 col-md-3 col-lg-3 control-label">{this.props.label}</label>
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <input type={this.props.type} onChange={(e) => {this.props.onChange(e, this.props.patternType)}} ref="input"
                           className="form-control" id={this.props.id} autoComplete="false" value={this.props.value}
                    />
                    <label className={this.props.errorValue == "" ? "none" : "error"}>{this.props.errorValue}</label>
                </div>

            </div>
        )
    }
}

SimpleInput.defaultProps = {
    type: "text",
    errorValue: ""
};
export default SimpleInput;
