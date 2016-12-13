import React from "react";
import {connect} from "react-redux";
import EditWorker from "../views/edit_worker/EditWorker";
import $ from "jquery";
import * as workerApi from "../api/worker-api";
import * as roleApi from "../api/role-api";
import * as companyApi from "../api/company-api";
import CleverPanel from "../views/CleverPanel";
import {Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";
class EditWorkerContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            workerApi.getWorker(id);
        }
        roleApi.getRolesWithoutSuperAdmin();
        companyApi.getStockOwnerCompany(this.props.idCompany);

    }

    saveWorker = (worker) => {
        window.scrollTo(0, 0);
        return workerApi.saveWorker(worker, '/workers');
    }

    redirectToWorkers = ()=> {
        this.redirect('/workers');
    }

    componentWillUnmount() {
        workerApi.clearReducer();
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
                        <CleverPanel response={this.props.workerResponse}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} smOffset={3}>
                        <CleverPanel response={this.props.companyResponse}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} smOffset={3}>
                        <CleverPanel response={this.props.rolesResponse}/>
                    </Col>
                </Row>
                <EditWorker worker={this.props.worker} roles={this.props.roles} company={this.props.company} onSaveClick={this.saveWorker}
                            onCloseClick={this.redirectToWorkers}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        worker: store.workerState.worker,
        roles: store.roleState.roles,
        rolesResponse: store.roleState.response,
        workerResponse: store.workerState.response,
        idCompany: store.auth.idCompany,
        company:store.companyState.stockOwnerCompany,
        companyResponse:store.companyState.response,
    }
};

export default connect(mapStateToProps)(EditWorkerContainer);