import React from 'react'
import './simpleInput.css';

class SimpleInput extends React.Component {

    constructor(props){
        super(props);
        this.getClassNameForShowPassword = this.getClassNameForShowPassword.bind(this);
    }

    getClassNameForShowPassword(){
        if (this.props.isPassword){
            if (this.props.isVisiblePassword){
                return "glyphicon glyphicon-eye-open passwordShowIcon";
            }
            return "glyphicon glyphicon-eye-close passwordShowIcon";
        }
        return "none";
    }

    render() {
        return (
            <div className="form-group">
                <label className="control-label">{this.props.label}</label>
                <input
                    type={this.props.isPassword && !this.props.isVisiblePassword ? "password" : "text"}
                    value={this.props.value}
                    autoComplete="off"
                    placeholder={this.props.label}
                    className="form-control"
                    id={this.props.id}
                    maxLength={this.props.length}
                    onChange={(e) => {
                        this.props.onChange(e, this.props.patternType)
                    }}
                    onBlur={(e) => {
                        this.props.onBlur(e, this.props.patternType)
                    }}
                />
                <label className={this.props.errorValue == "" ? "none" : "inputError"}>{this.props.errorValue}</label>
                <span id={this.props.id + "Visibility"} onClick={this.props.swapStatePassword}
                      className={this.getClassNameForShowPassword()}/>
            </div>
        )
    }
}

SimpleInput.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func,
    swapStatePassword: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
    isPassword: React.PropTypes.bool,
    value: React.PropTypes.any,
    length: React.PropTypes.number,
    id: React.PropTypes.string.isRequired,
    patternType: React.PropTypes.string,
    errorValue: React.PropTypes.string,
    isVisiblePassword: React.PropTypes.bool
};

SimpleInput.defaultProps = {
    isPassword: false,
    errorValue: "",
    isVisiblePassword: false,
    length: 20,
    onBlur: ()=>{},
    value: ""
};
export default SimpleInput;
