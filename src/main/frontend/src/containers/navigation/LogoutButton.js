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
            <p className={this.props.roles[0] === "ROLE_GUEST" ? "none" : "navbar-text"}>
                <a href="#" className="navbar-link" onClick={this.onLogoutClick}>Выйти</a>
            </p>
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