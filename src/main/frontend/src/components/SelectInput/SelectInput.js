import React from 'react'

import Select from 'react-select';
import '../../../node_modules/react-select/dist/react-select.css';

class SelectInput extends React.Component {

    renderError() {
        if (this.props.error && (this.props.error != '')) {
            return (<div className="control-label">{this.props.error}</div>);
        }
        else {
            return (<div>&nbsp;</div>);
        }
    }

    renderFormGroupClassName() {
        if (this.props.error && (this.props.error != '')) {
            return 'form-group has-error';
        }
        else if (this.props.resultType && (this.props.resultType != '')) {
            return 'form-group has-' + this.props.resultType;
        }
        else {
            return 'form-group';
        }
    }

    render() {
        return (
            <div className={this.renderFormGroupClassName()}>
                <label className="control-label">{this.props.label}</label>
                <Select
                    value={this.props.value}
                    options={this.props.options}
                    onChange={(value) => {this.props.onChange(value != null ? value.value : null)}}
                    placeholder={this.props.label} />
                {this.renderError()}
            </div>
        )
    }
}

export default SelectInput;

/*const SelectInput = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <Select
                value={props.value}
                options={props.options}
                onChange={(value) => {props.onChange(value != null ? value.value : null)}}
                placeholder={props.label} />
        </div>
    )
};

export default SelectInput;*/