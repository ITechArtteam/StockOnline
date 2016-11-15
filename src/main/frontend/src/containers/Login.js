import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class Login extends React.Component {
    handleFormSubmit = (values) => {
        this.props.signInUser(values)
    };

    renderField = ({input, label, type, meta: {touched, error}}) => (
        <fieldset className="form-group">
            <label className="control-label">{label}</label>
            <div>
                <input
                    {...input}
                    placeholder={label}
                    className="form-control"
                    type={type}
                />
            </div>
        </fieldset>
    );

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2 className="text-center">Log In</h2>
                    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                        <fieldset className="form-group">
                            <label>Email</label>
                            <Field
                                name="email"
                                component={this.renderField}
                                className="form-control"
                                type="text"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Password</label>
                            <Field
                                name="password"
                                component={this.renderField}
                                className="form-control"
                                type="password"
                                placeholder="Password"
                            />
                        </fieldset>
                        <div className="checkbox checkbox-primary">
                            <Field
                                id="remember"
                                name="remember"
                                component={this.renderField}
                                type="checkbox"
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <button action="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, Actions)(reduxForm({
    form: 'login'
})(Login))