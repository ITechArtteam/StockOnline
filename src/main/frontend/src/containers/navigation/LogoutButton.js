import {connect} from "react-redux";
import React from "react";
import {Link} from "react-router";
import * as axios from "axios";
import {authUser} from '../../actions/index'
import {browserHistory} from 'react-router';

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        browserHistory.push('/');
        axios.get("/logout");
        this.props.authUser();
    }

    render() {
        return(
            <div className="navbar-text pointer-cursor">
                <a className="navbar-link" onClick={this.onLogoutClick}>Выйти</a>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        roles: state.auth.roles
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        authUser: () => {
            dispatch(authUser({username: "GUEST",roles: ["ROLE_GUEST"]}))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutButton);