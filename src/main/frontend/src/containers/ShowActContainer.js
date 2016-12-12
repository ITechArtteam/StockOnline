import React from "react";
import ShowAct from "../views/show_act/ShowAct";
import {connect} from "react-redux";
import $ from "jquery";
import * as actApi from "../api/act-api";
import * as productsApi from "../api/products-api";
import CleverPanel from "../views/CleverPanel";
import {Row, Col} from "react-bootstrap";
import {browserHistory} from 'react-router';
class ShowActContainer extends React.Component {

    constructor(props) {
        super(props);
        var id = this.props.params.id;
        if ($.isNumeric(id)) {
            actApi.getAct(id);
        }
    }

    redirectAfteClose = ()=>{
        this.redirect("/acts")
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
                    <Col sm={8} smOffset={2}>
                        <CleverPanel response={this.props.response} />
                    </Col>
                </Row>
                <ShowAct act={this.props.act} onCloseClick={this.redirectAfteClose}/>
            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        act: store.actState.act,
        response: store.actState.response
    }
};

export default connect(mapStateToProps)(ShowActContainer);
