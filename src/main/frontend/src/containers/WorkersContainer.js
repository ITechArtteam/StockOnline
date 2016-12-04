import React from "react";
import Workers from "../views/workers/Workers";
import {connect} from "react-redux";
import * as workersApi from "../api/workers-api";
import CleverPanel from "../views/CleverPanel";
import {browserHistory} from 'react-router';
class WorkersContainer extends React.Component {
    constructor(props) {
        super(props);
        workersApi.getWorkers()
    }

    onCreateClick = ()=> {
        this.redirect('/worker');
    }

    onEditClick = (id) =>{
        this.redirect('/worker/'+id);
    }

    onDeleteClick = (ids)=> {
        console.log(ids);
        workersApi.deleteWorkers(ids)
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
                <Workers workers={this.props.workers} onCreateClick={this.onCreateClick} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick}/>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        workers: store.workersState.workers,
        response: store.workersState.response,
    }
};

export default connect(mapStateToProps)(WorkersContainer);
