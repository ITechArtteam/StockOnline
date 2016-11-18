import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(WrappedComponent) {
    class Auth extends React.Component {
        constructor(props){
            super(props);
            this.checkRoles = this.checkRoles.bind(this);
        }
        checkRoles(roles){
            for (let myIterator = 0; myIterator < roles.length; myIterator++) {
                if ($.inArray(roles[myIterator], this.props.roles) != -1) {
                    return false;
                }
            }
            return true;
        }
        componentWillMount() {
            if (!this.props.authenticated || this.checkRoles(this.props.route.requiredRole)) {
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