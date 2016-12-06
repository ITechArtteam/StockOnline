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
        actsApi.getActs()
        workersApi.getControllers();
    }

    onCreateClick = ()=> {
        this.redirect('/act');
    }

    onEditClick = (id) =>{
        this.redirect('/act/'+id);
    }

    onDeleteClick = (ids)=> {
        actsApi.deleteActs(ids)
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
                <Acts acts={this.props.acts} controllers={this.props.controllers} onCreateClick={this.onCreateClick} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick}/>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        acts: store.actsState.acts,
        controllers:store.workersState.workers,
        response: store.actsState.response,
    }
};

export default connect(mapStateToProps)(ActsContainer);
