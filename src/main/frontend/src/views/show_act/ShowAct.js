import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl} from "react-bootstrap";
import linkState from "react-link-state";
import "react-widgets/dist/css/react-widgets.css";
import ProductsTable from "./ProductsTable";
import moment from "moment";
class ShowAct extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        act: this.props.act,
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    componentWillMount() {
        this.updateProps(this.props);
    }

    updateProps = (props) => {
        var newAct = _.extend({},props.act);
        newAct.reportDate=moment(props.act.reportDate).format('lll');
        this.setState({act:newAct});
    }


    onCloseClick = () => {
        this.props.onCloseClick();
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
                            <ProductsTable products={this.state.act.productInActs}/>
                        </Col>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <div className="btn-group" role="group">
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


export default ShowAct;
