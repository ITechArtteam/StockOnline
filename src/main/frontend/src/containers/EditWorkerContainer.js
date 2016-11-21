import React from "react";
import {connect} from "react-redux";
import EditWorker from "../views/EditWorker";
import $ from "jquery";
import * as workerApi from "../api/worker-api";
import * as roleApi from "../api/role-api"
import store from "../store/configureStore"

class EditWorkerContainer extends React.Component {

    constructor(props) {
        super(props);
        roleApi.getRoles();
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            workerApi.getWorker(id);
        }

    }

    saveWorker = (worker) => {
        workerApi.saveWorker(worker);

    }



    render() {
        console.log(this.props.roles)
        return (
            <EditWorker worker={this.props.worker} roles={this.props.roles} onSaveClick={this.saveWorker}/>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        worker: store.workerState.worker,
        roles: store.roleState.roles
    }
};

export default connect(mapStateToProps)(EditWorkerContainer);