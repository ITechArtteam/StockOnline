import React from 'react'
import DatePicker from 'react-bootstrap-date-picker'

class DateInput extends React.Component {

    renderError() {
        if (this.props.error && (this.props.error != '')) {
            return (<div className="control-label">{this.props.error}</div>);
        }
        else {
            return (<div>&nbsp;</div>);
        }
    }

    handleOnBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    renderFormGroupClassName() {
        return 'form-group above-calendar' + ((this.props.error && (this.props.error != '')) ? ' has-error' : '');
    }

    render() {
        return (
            <div className={this.renderFormGroupClassName()}>
                <label className="control-label">{this.props.label}</label>
                <DatePicker
                    value={this.props.value}
                    onChange={(value) => {this.props.onChange(value)}}
                    onBlur={() => {this.handleOnBlur()}} />
                {this.renderError()}
            </div>
        )
    }
}

export default DateInput;

/*const DateInput = (props) => {
    return (
        <div className="form-group above-calendar">
            <label className="control-label">{props.label}</label>
            <DatePicker
                value={props.value}
                onChange={(value) => {props.onChange(value)}}/>
        </div>
    )
};

export default DateInput;*/