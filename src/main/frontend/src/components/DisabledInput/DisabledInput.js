import React from 'react'

class DisabledInput extends React.Component {

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
                <input
                    type="text"
                    className="form-control"
                    value={this.props.value}
                    disabled />
                {this.renderError()}
            </div>
        )
    }
}

/*const DisabledInput = (props) => {
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
};*/

export default DisabledInput;