import React from 'react'
import Workers from "../views/Workers";
import { connect } from 'react-redux';
import * as workerApi from '../api/worker-api';
class WorkersContainer extends React.Component {
    constructor(props) {
        super(props);
        workerApi.getWorkers()
    }

    render() {
        return (
            <Workers workers={this.props.workers}/>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        workers: store.workerState.workers
    }
};

export default connect(mapStateToProps)(WorkersContainer);
