import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(WrappedComponent) {
    class Auth extends React.Component {
        componentWillMount() {
            if (!this.props.authenticated || ($.inArray(this.props.route.requiredRole, this.props.roles) == -1)) {
                browserHistory.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated,
            roles: state.auth.roles
        };
    }

    return connect(mapStateToProps)(Auth);
}