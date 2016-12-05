import React from 'react'
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
        productsApi.getProducts();

    }

    saveAct = (worker) => {
        window.scrollTo(0, 0);
        return actApi.saveAct(act, '/acts');
    }



    redirect = (path) => {
        if (path != null) {
            browserHistory.push(path);
        }
    }


    render(){
        return (
            <EditAct act={this.props.act} products={this.props.products} onSaveClick={this.saveAct}/>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        act: store.actState.act,
        products: store.productsState.products,
        response: store.actState.response,
    }
};

export default connect(mapStateToProps)(EditActContainer);