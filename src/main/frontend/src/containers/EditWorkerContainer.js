import React from "react";
import { connect } from 'react-redux';
import * as workerApi from '../api/worker-api';
import EditWorker from "../views/EditWorker";
import store from "../store/store"
class EditWorkerContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id
        console.log(id)
        workerApi.getWorker(id)
        console.log(this.props.worker)
    }

    render() {
        return (
            <EditWorker  worker={this.props.worker}/>
        );
    }
}

const mapStateToProps = (store) => {
    console.log(store)
    return {
        worker: store.workerState.worker
    }
};

export default connect(mapStateToProps)(EditWorkerContainer);


