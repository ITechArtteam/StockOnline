import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl} from "react-bootstrap";
import linkState from "react-link-state";
import moment from "moment";
import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import ProductsTable from "./ProductsTable";
class EditAct extends React.Component {
    constructor(props) {
        console.log(props)
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
            newAct.reportDate = moment().format('llll');
        } else {
            newAct.reportDate = moment(newAct.reportDate).format('llll');
        }
        newAct.user.id = props.controller_id;
        newAct.user.login = props.controller_username;
        this.setState({act: newAct});
    }


    onSaveClick = () => {
        this.state.act.reportDate = moment(this.state.act.reportDate);
        this.props.onSaveClick(this.state.act);
    }

    onCloseClick = () => {
        this.props.onCloseClick();
    }


    onUpdate = (products_in_act) => {

        var newAct = _.extend({}, this.state.act);
        newAct.products_in_act = [...products_in_act];
        this.setState({act: newAct});
    }

    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup >
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Контролер
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Контролер"
                                             valueLink={linkState(this, 'act.user.login')} readOnly/>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Дата
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Дата"
                                             valueLink={linkState(this, 'act.reportDate')} readOnly/>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>

                        <ProductsTable act_status={this.state.act_status} waybill_produts={this.state.products}
                                       products_in_act={this.state.act.products_in_act} onUpdate={this.onUpdate}/>
                        <FormGroup>
                            <Col smOffset={3} sm={9}>
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