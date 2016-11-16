import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
import _ from "lodash";
import Select from "react-simpler-select"


class EditWorker extends React.Component {
    constructor(props) {
        super(props);

        console.log(this)
    }

    state = {
        worker: this.props.worker,
        roles: [
            {value: 'Администратор системы', label: 'Администратор системы'},
            {value: 'Администратор склада', label: 'Администратор склада'},
            {value: 'Диспетчер склада', label: 'Диспетчер склада'},
            {value: 'Менеджер по складу', label: 'Менеджер по складу'},
            {value: 'Контролёр', label: 'Контролёр'},
            {value: 'Владенлец склада', label: 'Владенлец склада', clearableValue: false}]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({worker: nextProps.worker})
    }

    logChange = (val) => {
        console.log("Selected: " + val);
    }

    handleSelectChange = (newValue) => {
        this.setState({worker: _.extend(this.state.worker, {roles: newValue})});
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
                                <Select
                                    name="multiple-languages"
                                    value={this.state.worker.roles}
                                    options={this.state.roles}
                                    onChange={this.handleSelectChange}
                                />
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