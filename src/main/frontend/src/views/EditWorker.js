import React from "react";
import {Grid, Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
import "./EditWorker.less";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';

class EditWorker extends React.Component {
    constructor(props) {
        super(props);
        console.log(this)
    }

    state = {
        worker: this.props.worker,
        roles: this.props.roles
    }

    componentWillReceiveProps(nextProps) {
        this.setState({worker: nextProps.worker})
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(this)
    }

    logChange = (val) => {
        console.log("Selected: " + val);
    }

    onSaveClick = () => {
        console.log("onSaveClick");
        console.log(this.state.worker);
        this.props.onSaveClick(this.state.worker);
    }

    onCloseClick = () => {
        console.log("onCloseClick");
        console.log(this.state.worker);
    }

    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup >
                            <Col sm={2} componentClass={ControlLabel}>
                                Имя
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Имя"
                                             valueLink={linkState(this, 'worker.name')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Фамилия
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Фамилия"
                                             valueLink={linkState(this, 'worker.surname')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Отчество
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Отчество"
                                             valueLink={linkState(this, 'worker.patronymic')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Дата рождения
                            </Col>
                            <Col sm={10}>
                                <DatePicker className="form-control"
                                            selected={moment()}
                                />
                                <HelpBlock>Это поле должzxdfdgdgно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Электронная почта
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Электронная почта"
                                             valueLink={linkState(this, 'worker.email')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Страна
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Страна"
                                             valueLink={linkState(this, 'worker.address.countryName')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Город
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Город"
                                             valueLink={linkState(this, 'worker.address.cityName')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Дом
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Дом"
                                             valueLink={linkState(this, 'worker.address.home')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Квартира
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Квартира"
                                             valueLink={linkState(this, 'worker.address.room')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Роль
                            </Col>
                            <Col sm={10}>
                                <Multiselect data={this.state.roles}
                                             valueLink={linkState(this, 'worker.roles')}
                                             textField='name'
                                             valueField='id'/>
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Логин
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Логин"
                                             valueLink={linkState(this, 'worker.login')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>
                                Пароль
                            </Col>
                            <Col sm={10}>
                                <FormControl placeholder="Пароль"
                                             valueLink={linkState(this, 'worker.password')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <div className="btn-group" role="group">
                                    <Button type="submit" bsStyle="primary"
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

export default EditWorker;
