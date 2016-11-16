import React from "react";
import {connect} from "react-redux";
import EditWorker from "../views/EditWorker";
import $ from "jquery";
import * as workerApi from "../api/worker-api";

class EditWorkerContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            workerApi.getWorker(id);
        }
    }

    saveWorker = (worker) => {
        workerApi.saveWorker(worker);
    }



    render() {
        return (
            <EditWorker worker={this.props.worker} onSaveClick={this.saveWorker}/>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        worker: store.workerState.worker
    }
};

export default connect(mapStateToProps)(EditWorkerContainer);


