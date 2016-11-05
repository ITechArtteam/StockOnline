import React from 'react'
import './style.css';

class SimpleInput extends React.Component {

    render() {
        return (
            <div className="form-group" >
                <label htmlFor={this.props.id}
                       className="col-sm-3 col-md-3 col-lg-3 control-label">{this.props.label}</label>
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <input type={this.props.isPassword && !this.props.isVisiblePassword ? "password" : "text"}
                           value={this.props.value} autoComplete="off"
                           className="form-control" id={this.props.id} maxLength="20"
                           onChange={(e) => {this.props.onChange(e, this.props.patternType)}}
                    />
                    <label className={this.props.errorValue == "" ? "none" : "error"}>{this.props.errorValue}</label>
                </div>
                <span id={this.props.id + "Visibility"} onClick={this.props.swapStatePassword}
                      className={this.props.isPassword ?
                          this.props.isVisiblePassword ? "glyphicon glyphicon-eye-open"
                              : "glyphicon glyphicon-eye-close" : "none"}/>
            </div>
        )
    }
}

SimpleInput.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    swapStatePassword: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
    isPassword: React.PropTypes.bool,
    value: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    patternType: React.PropTypes.string,
    errorValue: React.PropTypes.string,
    isVisiblePassword: React.PropTypes.bool
};

SimpleInput.defaultProps = {
    isPassword: false,
    errorValue: "",
    isVisiblePassword: false
};
export default SimpleInput;
