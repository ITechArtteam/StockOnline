import React from "react";
import {connect} from "react-redux";
import EditWorker from "../views/EditWorker";
import $ from "jquery";
import * as workerApi from "../api/worker-api";
import * as roleApi from "../api/role-api";
import CleverPanel from "../views/CleverPanel";
import {Row, Col} from "react-bootstrap";
import {browserHistory} from 'react-router';
class EditWorkerContainer extends React.Component {

    constructor(props) {
        super(props);
        roleApi.getRoles();
        workerApi.closeResponse();
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            workerApi.getWorker(id);
        }
    }

    saveWorker = (worker) => {
        window.scrollTo(0, 0);
        return workerApi.saveWorker(worker, '/workers');
    }

    redirectToWorkers = ()=>{
        this.redirect('/workers');
    }

    redirect = (path) => {
        if (path != null) {
            browserHistory.push(path);
        }
    }


    render() {
        return (
            <div>

                <Row>
                    <Col sm={6} smOffset={3}>
                        <CleverPanel response={this.props.response}/>
                    </Col>
                </Row>
                <EditWorker worker={this.props.worker} roles={this.props.roles} onSaveClick={this.saveWorker} onCloseClick={this.redirectToWorkers}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        worker: store.workerState.worker,
        roles: store.roleState.roles,
        response: store.workerState.response,
    }
};

export default connect(mapStateToProps)(EditWorkerContainer);