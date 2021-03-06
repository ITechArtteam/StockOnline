import React from "react";
import EditAct from "../views/edit_act/EditAct";
import {connect} from "react-redux";
import $ from "jquery";
import * as actApi from "../api/act-api";
import * as productsApi from "../api/products-api";
import CleverPanel from "../views/CleverPanel";
import {browserHistory} from "react-router";
class EditActContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            actApi.getAct(id);
        }
        productsApi.getActStatus();
    }

    saveAct = (act) => {
        browserHistory.go(-1);
        window.scrollTo(0, 0);
        console.log(act)
        actApi.saveActInStore(act);
    }

    redirectAfteClose = ()=> {
        browserHistory.go(-1);
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {

    }


    redirect = (path) => {
        if (path != null) {
            browserHistory.push(path);
        }
    }


    render() {
        return (
            <div>
                <CleverPanel response={this.props.actResponse}/>
                <EditAct act={this.props.act} controller_username={this.props.controller_username}
                         controller_id={this.props.controller_id} act_status={this.props.act_status}
                         products={this.props.products} onSaveClick={this.saveAct}
                         onCloseClick={this.redirectAfteClose}/>
            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        act: store.actState.act,
        actResponse: store.actState.response,
        act_status: store.productsState.act_status,
        controller_username: store.auth.username,
        controller_id: store.auth.id,
        products: store.checkGoodsReducer.waybill.productInWaybills,
    }
};

export default connect(mapStateToProps)(EditActContainer);