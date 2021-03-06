import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl} from "react-bootstrap";
import linkState from "react-link-state";
import moment from "moment";
import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import ProductsTable from "./ProductsTable";
class EditAct extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        act: this.props.act,
        products: this.props.products,
        act_status: this.props.act_status,
        controller_username: this.props.controller_username,
        controller_id: this.props.controller_id
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
        this.setState({
            products: nextProps.products,
            act_status: nextProps.act_status,
            controller_username: nextProps.controller_username,
            controller_id: nextProps.controller_id
        });
    }

    componentWillMount() {
        this.updateProps(this.props);
    }

    updateProps = (props) => {
        var newAct = _.extend({}, props.act);
        if (newAct.id == "") {
            newAct.reportDate = moment().format('MM-DD-YYYY');
        } else {
            newAct.reportDate = moment(newAct.reportDate).format('MM-DD-YYYY');
        }
        newAct.user.id = props.controller_id;
        newAct.user.login = props.controller_username;
        var newDisabledSaveButton = _.extend({}, this.state.disabledSaveButton);
        if (this.state.act.productInActs.length>0){
            newDisabledSaveButton=false;
        }else{
            newDisabledSaveButton=true;
        }
        this.setState({act: newAct, disabledSaveButton:newDisabledSaveButton});
    }


    onSaveClick = () => {
        this.state.act.reportDate = +moment(this.state.act.reportDate);
        this.state.act.id=1;
        this.props.onSaveClick(this.state.act);
    }

    onCloseClick = () => {
        this.props.onCloseClick();
    }


    onUpdate = (products_in_act) => {
        var newAct = _.extend({}, this.state.act);
        newAct.productInActs = [...products_in_act];
        var newDisabledSaveButton = _.extend({}, this.state.disabledSaveButton);
        console.log(newAct)
        if (newAct.productInActs.length>0){
            newDisabledSaveButton=false;
        }else{
            newDisabledSaveButton=true;
        }
        this.setState({act: newAct, disabledSaveButton:newDisabledSaveButton});
    }





    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup >
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Контролер
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Контролер"
                                             valueLink={linkState(this, 'act.user.login')} readOnly/>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Дата
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Дата"
                                             valueLink={linkState(this, 'act.reportDate')} readOnly/>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <Col smOffset={2} sm={8}>
                            <ProductsTable act_status={this.state.act_status} waybill_produts={this.state.products}
                                           products_in_act={this.state.act.productInActs} onUpdate={this.onUpdate}/>
                        </Col>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <div className="btn-group" role="group">
                                    <Button disabled={this.state.disabledSaveButton} bsStyle="primary"
                                            onClick={this.onSaveClick}>Сохранить</Button>
                                    <Button onClick={this.onCloseClick}>Отмена</Button>
                                </div>
                            </Col>
                        </FormGroup>
                    </Form>
                </Row>
            </div>
        )
    }
}




export default EditAct;