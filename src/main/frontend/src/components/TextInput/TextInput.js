import React from 'react'

class TextInput extends React.Component {

    renderError() {
        if (this.props.error && (this.props.error != '')) {
            return (<div className="control-label">{this.props.error}</div>);
        }
        else {
            return '';
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
                <input
                    type="text"
                    name={this.props.name}
                    value={this.props.value}
                    className={'form-control'}
                    onChange={(event) => this.props.onChange(event.target.value)}
                    onBlur={this.props.onBlur} />
                {this.renderError()}
            </div>
        )
    }
}

export default TextInput;