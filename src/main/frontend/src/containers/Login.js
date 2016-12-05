import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

import '../global.css'

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = "Введите имя пользователя";
    }

    if (!values.password) {
        errors.password = "Введите пароль";
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
            <div className="vertical-center">
                <div className="container">
                    <div className="col-md-6 col-md-offset-3">
                        <h2 className="text-center">Вход</h2>

                        { this.renderAuthenticationError() }

                        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                            <Field name="username" component={this.renderField} className="form-control" type="text" label="Имя пользователя"/>
                            <Field name="password" component={this.renderField} className="form-control" type="password" label="Пароль"/>

                            <div className="text-center">
                                <button action="submit" className="btn btn-primary cente-block">Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticationError: state.auth.error
    }
}

export default connect(mapStateToProps, Actions)(reduxForm({
    form: 'login',
    validate
})(Login));