import React from "react";
import EditAct from "../views/edit_act/EditAct";
import {connect} from "react-redux";
import $ from "jquery";
import * as actApi from "../api/act-api";
import * as productsApi from "../api/products-api";
import CleverPanel from "../views/CleverPanel";
import {Row, Col} from "react-bootstrap";
import {browserHistory} from 'react-router';
class EditActContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id;
        actApi.clearReducer();
        if ($.isNumeric(id)) {
            actApi.getAct(id);
        }
        productsApi.getActStatus();
        productsApi.getProducts();

    }

    saveAct = (act) => {
        window.scrollTo(0, 0);
        return actApi.saveAct(act, '/acts');
    }

    redirectToActs = ()=>{
        this.redirect('/acts');
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
                <EditAct act={this.props.act} controller_username={this.props.controller_username}
                         controller_id={this.props.controller_id} act_status={this.props.act_status}
                         products={this.props.products} onSaveClick={this.saveAct} onCloseClick={this.redirectToActs}/>
            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        act: store.actState.act,
        products: store.productsState.products,
        response: store.actState.response,
        act_status: store.productsState.act_status,
        controller_username: store.auth.username,
        controller_id: store.auth.id,
    }
};

export default connect(mapStateToProps)(EditActContainer);