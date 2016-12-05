import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
class EditAct extends React.Component{
    constructor(props){
        super(props);
    }

    state ={
        act: this.props.act
    }

    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup >
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Дата
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Дата"
                                             valueLink={linkState(this, 'act.report_date')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Количество
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Количество"
                                             valueLink={linkState(this, 'act.count')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Цена
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Отчество"
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
                                <FormControl type="email" placeholder="Статус"
                                             valueLink={linkState(this, 'act.status')}/>
                                <FormControl.Feedback />
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
