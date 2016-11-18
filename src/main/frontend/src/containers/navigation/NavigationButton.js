import {connect} from "react-redux";
import React from "react";
import {navigationActionCreator} from "./index";
import {Link} from "react-router";

class NavigationButton extends React.Component {

    constructor(props) {
        super(props);
        this.checkRoles = this.checkRoles.bind(this);
        this.checkActive = this.checkActive.bind(this);
        this.setActiveButton = this.setActiveButton.bind(this);
    }

    checkRoles() {
        for (let i = 0; i < this.props.mustHaveRoles.length; i++) {
            if ($.inArray(this.props.mustHaveRoles[0], this.props.roles) != -1) {
                return "";
            }
        }
        return "none";
    }

    checkActive(buttonText){
        if (buttonText == this.props.activeNavigationButton){
            return " active";
        }
        return "";
    }

    setActiveButton(buttonText){
        this.props.setActiveNavigationButton(buttonText);
    }

    render() {
        return(
            <li className={this.checkRoles() + this.checkActive(this.props.buttonText)}
                onClick={()=>this.setActiveButton(this.props.buttonText)}>
                <Link to={this.props.to}>{this.props.buttonText}</Link>
            </li>
        )
    }
}


function mapStateToProps(state) {
    return {
        roles: state.auth.roles,
        activeNavigationButton: state.navigation.frontend.activeNavigationButton
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveNavigationButton: (buttonText) => {
            dispatch(navigationActionCreator.setActiveNavigationButton(buttonText))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationButton);