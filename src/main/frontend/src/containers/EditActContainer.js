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
        console.log(browserHistory)
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            actApi.getActFromStore(id);
        }
        productsApi.getActStatus();
    }

    saveAct = (act) => {
        browserHistory.go(-1);
        window.scrollTo(0, 0);
        actApi.saveActInStore(act);
    }

    redirectAfteClose = ()=>{
        browserHistory.go(-1);
    }

    componentWillUnmount(){
        actApi.clearReducer();
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
                         products={this.props.products} onSaveClick={this.saveAct} onCloseClick={this.redirectAfteClose}/>
            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        act: store.actsState.act,
        response: store.actsState.response,
        act_status: store.productsState.act_status,
        controller_username: store.auth.username,
        controller_id: store.auth.id,
        products:store.checkGoodsReducer.waybill.productInWaybills,
    }
};

export default connect(mapStateToProps)(EditActContainer);