import React from 'react'

import './style.css'

class TextAreaInput extends React.Component {

    renderError() {
        if (this.props.error && (this.props.error != '')) {
            return (<div className="control-label">{this.props.error}</div>);
        }
        else {
            return '';
        }
    }

    renderFormGroupClassName() {
        return 'form-group' + ((this.props.error && (this.props.error != '') ? ' has-error' : ''));
    }

    render() {
        return (
            <div className={this.renderFormGroupClassName()}>
                <label className="control-label">{this.props.label}</label>
                <textarea
                    className="form-control disabled-resizing"
                    onChange={(event) => this.props.onChange(event.target.value)}
                    value={this.props.value}
                    onBlur={this.props.onBlur}
                />
                {this.renderError()}
            </div>
        )

    }
}

export default TextAreaInput;