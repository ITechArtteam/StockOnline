import React from "react";
import Acts from "../views/acts/Acts";
import {connect} from "react-redux";
import * as actApi from "../api/act-api";
import * as actsApi from "../api/acts-api";
import * as workersApi from "../api/workers-api";
import CleverPanel from "../views/CleverPanel";
import {browserHistory} from 'react-router';
class ActsContainer extends React.Component {
    constructor(props) {
        super(props);
        actsApi.getActsByCompany(this.props.idCompany)
    }



    onShowClick = (id) =>{
        this.redirect('/show_act/'+id);
    }



    componentWillUnmount(){
        actsApi.clearReducer();
    }

    redirect = (path) => {
        if (path != null) {
            browserHistory.push(path);
        }
    }

    render() {
        return (
            <div>
                <CleverPanel response={this.props.response}/>
                <Acts acts={this.props.acts} idCompany={this.props.idCompany} onShowClick={this.onShowClick}/>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        acts: store.actsState.acts,
        idCompany:store.auth.idCompany,
        response: store.actsState.response,
    }
};

export default connect(mapStateToProps)(ActsContainer);
