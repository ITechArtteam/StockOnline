import React from "react";
import Workers from "../views/workers/Workers";
import {connect} from "react-redux";
import * as workersApi from "../api/workers-api";
import * as workerApi from "../api/worker-api";
import CleverPanel from "../views/CleverPanel";
import {browserHistory} from 'react-router';
class WorkersContainer extends React.Component {
    constructor(props) {
        super(props);
        workersApi.getWorkersByCompany(this.props.idCompany)
    }

    onCreateClick = ()=> {
        this.redirect('/worker');
    }

    onEditClick = (id) =>{
        this.redirect('/worker/'+id);
    }

    onDeleteClick = (ids)=> {
        workersApi.deleteWorkers(ids)
    }

    componentWillUnmount(){
        workersApi.clearReducer();
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
        idCompany:store.auth.idCompany,
    }
};

export default connect(mapStateToProps)(WorkersContainer);
