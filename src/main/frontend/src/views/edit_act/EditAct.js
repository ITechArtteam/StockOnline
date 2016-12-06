import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
import moment from "moment";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
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
        this.setState({
            act: nextProps.act,
            products: nextProps.products,
            act_status: nextProps.act_status,
            controller_username: nextProps.controller_username,
            controller_id: nextProps.controller_id
        });
        var newAct = _.extend({}, this.state.act);
        newAct.report_date = moment().format('llll');
        newAct.user.id = this.state.controller_id;
        newAct.user.login = this.state.controller_username;
        this.setState({act: newAct});
    }

    componentWillMount() {
        var newAct = _.extend({}, this.state.act);
        newAct.report_date = moment().format('llll');
        newAct.user.id = this.state.controller_id;
        newAct.user.login = this.state.controller_username;
        this.setState({act: newAct});
    }


    onSaveClick = () => {
        this.props.onSaveClick(this.state.act);
    }

    onCloseClick = () => {
        this.props.onCloseClick();
    }

    onCalculateClick = () => {
        var newAct = _.extend({}, this.state.act);
        newAct.cost = this.state.act.product.cost * this.state.act.count / this.state.act.product.count;
        console.log(newAct)
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
                                             valueLink={linkState(this, 'act.report_date')} readOnly/>
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Продукт
                            </Col>
                            <Col sm={5}>
                                <DropdownList
                                    valueField='id' textField='name'
                                    data={this.state.products}
                                    value={this.state.act.product.id}
                                    onChange={selectProduct => {
                                        var newAct = _.extend({}, this.state.act);
                                        newAct.product = _.find(this.state.products, product => {
                                            return product.id == selectProduct.id;
                                        });
                                        this.setState({act: newAct});
                                        if (newAct.product != undefined) {
                                            newAct.count = newAct.product.count;
                                        }

                                    }}/>
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Единицы
                            </Col>
                            <Col sm={5}>
                                <FormControl readOnly placeholder="Единицы"
                                             valueLink={linkState(this, 'act.product.unit')}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Количество
                            </Col>
                            <Col sm={3}>
                                <FormControl placeholder="Количество"
                                             valueLink={linkState(this, 'act.count')} type="number"/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                            <Col sm={2}>
                                <CalculateButton onClick={this.onCalculateClick} act={this.state.act} block={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Стоимость
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Стоимость"
                                             valueLink={linkState(this, 'act.cost')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Статус
                            </Col>
                            <Col sm={5}>
                                <DropdownList
                                    valueField='id' textField='name'
                                    data={this.state.act_status}
                                    value={this.state.act.status.id}
                                    onChange={selectStatus => {
                                        var newAct = _.extend({}, this.state.act);
                                        newAct.status = _.find(this.state.act_status, status => {
                                            return status == selectStatus;
                                        });
                                        this.setState({act: newAct});
                                    }}/>
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
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

class CalculateButton extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        disabledCalculateButton: true
    }

    componentWillReceiveProps(nextProps) {
        if ($.isNumeric(nextProps.act.product.cost) && $.isNumeric(nextProps.act.count)) {
            this.setState({disabledCalculateButton: false});
        } else {
            this.setState({disabledCalculateButton: true});
        }
    }

    render() {
        return (
            <Button disabled={this.state.disabledCalculateButton}
                    onClick={this.props.onClick} {...this.props}>Рассчитать</Button>
        )
    }
}

export default EditAct;