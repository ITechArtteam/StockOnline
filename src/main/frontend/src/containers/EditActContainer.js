import React from "react";
import EditAct from "../views/edit_act/EditAct";
import {connect} from "react-redux";
import $ from "jquery";
import * as actApi from "../api/act-api";
import * as productsApi from "../api/products-api";
class EditActContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id;
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


    redirect = (path) => {
        if (path != null) {
            browserHistory.push(path);
        }
    }


    render() {
        return (
            <EditAct act={this.props.act} controller={this.props.controller} act_status={this.props.act_status}
                     products={this.props.products} onSaveClick={this.saveAct}/>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        act: store.actState.act,
        products: store.productsState.products,
        response: store.actState.response,
        act_status: store.productsState.act_status,
        controller: store.auth.username
    }
};

export default connect(mapStateToProps)(EditActContainer);