import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
import "./EditWorker.less";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";


class EditWorker extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        worker: this.props.worker,
        roles: this.props.roles,
        disabledSaveButton: false
    }

    getDate = ()=>{
        if (this.state.worker.date!=''&&this.state.worker.date!=undefined) {
            return moment(this.state.worker.date, 'DD/MM/YYYY')
        }
        return null;

    }

    componentWillReceiveProps(nextProps) {
        this.setState({worker: nextProps.worker, roles: nextProps.roles});
    }

    onSaveClick = () => {
        this.setState({disabledSaveButton: true});
        this.props.onSaveClick(this.state.worker);
        this.setState({disabledSaveButton: false});
    }

    onCloseClick = () => {
        this.props.onCloseClick();
    }

    handleChange = (date)=>{
        var newWorker = _.extend({}, this.state.worker);
        newWorker.date= date.format('DD/MM/YYYY');
        this.setState({ worker: newWorker });

    }


    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup >
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Имя
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Имя"
                                             valueLink={linkState(this, 'worker.name')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Фамилия
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Фамилия"
                                             valueLink={linkState(this, 'worker.surname')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Отчество
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Отчество"
                                             valueLink={linkState(this, 'worker.patronymic')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Дата рождения
                            </Col>
                            <Col sm={5}>
                                <DatePicker className="form-control"
                                            selected={this.getDate()}
                                            onChange={this.handleChange}
                                />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Электронная почта
                            </Col>
                            <Col sm={5}>
                                <FormControl type="email" placeholder="Электронная почта"
                                             valueLink={linkState(this, 'worker.email')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Страна
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Страна"
                                             valueLink={linkState(this, 'worker.address.countryName')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Город
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Город"
                                             valueLink={linkState(this, 'worker.address.cityName')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Дом
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Дом"
                                             valueLink={linkState(this, 'worker.address.home')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Квартира
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Квартира"
                                             valueLink={linkState(this, 'worker.address.room')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Роль
                            </Col>
                            <Col sm={5}>
                                <Multiselect data={this.state.roles}
                                             valueLink={linkState(this, 'worker.roles')}
                                             textField='name'
                                             valueField='id'/>
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Логин
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Логин"
                                             valueLink={linkState(this, 'worker.login')}/>
                                <FormControl.Feedback />
                                <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Пароль
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Пароль"
                                             valueLink={linkState(this, 'worker.password')}/>
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

export default EditWorker;
