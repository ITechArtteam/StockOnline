import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as Actions from '../actions'

import Calendar from 'react-input-calendar'
require('react-input-calendar/style/index.css');

class EditWaybill extends React.Component {
    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
            <label className="control-label">{label}</label>
            <div>
                <input {...input} placeholder={label} className="form-control" type={type} />
                {touched && error && <div className="help-block">{error}</div>}
            </div>
        </fieldset>
    );

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 className="text-center">{this.props.header}</h2>
                <form>
                    <Field name="waybill-number" component={this.renderField} className="form-control" type="text" label="Номер накладной" />
                    <Calendar format='DD/MM/YYYY' date='4-12-2014' />
                </form>
            </div>
        )
    }
}

export default connect(null, Actions)(reduxForm({
    form: 'editWaybill'
})(EditWaybill));
