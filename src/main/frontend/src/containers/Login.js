import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = "Please enter an username.";
    }

    if (!values.password) {
        errors.password = "Please enter a password.";
    }

    return errors;
};

class Login extends React.Component {
    handleFormSubmit = (values) => {
        this.props.signInUser(values);
    };

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
            <label className="control-label">{label}</label>
            <div>
                <input {...input} placeholder={label} className="form-control" type={type} />
                {touched && error && <div className="help-block">{error}</div>}
            </div>
        </fieldset>
    );

    renderAuthenticationError() {
        if (this.props.authenticationError) {
            return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
        }
        return <div></div>;
    }

    render() {
        return(
            <div className="container">
                <div className="col-md-6 col-md-offset-3">
                    <h2 className="text-center">Log In</h2>

                    { this.renderAuthenticationError() }

                    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                        <Field name="username" component={this.renderField} className="form-control" type="text" label="Username"/>
                        <Field name="password" component={this.renderField} className="form-control" type="password" label="Password"/>

                        <button action="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, Actions)(reduxForm({
    form: 'login',
    validate
})(Login));