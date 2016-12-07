import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
import "./EditWorker.less";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-bootstrap-date-picker";


class EditWorker extends React.Component {
    constructor(props) {
        console.log(props)
        super(props);
    }

    state = {
        worker: this.props.worker,
        roles: this.props.roles,
        disabledSaveButton: false
    }


    componentWillReceiveProps(nextProps) {
        this.setState({worker: nextProps.worker, roles: nextProps.roles});
        this.updateProps(nextProps);
    }

    componentWillMount() {
        this.updateProps(this.props);
    }

    updateProps = (props)=> {
        console.log(props)
        var newWorker = _.extend({}, this.state.worker);
        newWorker.stockOwnerCompany.id = this.props.company.id;
        newWorker.stockOwnerCompany.name = this.props.company.name;
        this.setState({worker: newWorker});
        console.log(this.state.worker.stockOwnerCompany.name);
    }

    onSaveClick = () => {
        this.setState({disabledSaveButton: true});
        this.props.onSaveClick(this.state.worker);
        this.setState({disabledSaveButton: false});
    }

    onCloseClick = () => {
        this.props.onCloseClick();
    }

    handleChange = (date)=> {
        var newWorker = _.extend({}, this.state.worker);
        newWorker.date = date.format('DD/MM/YYYY');
        this.setState({worker: newWorker});

    }


    render() {
        console.log(this.state.worker.stockOwnerCompany.name);
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup >
                            <Col smOffset={3} sm={1} componentClass={ControlLabel}>
                                Компания
                            </Col>
                            <Col sm={5}>
                                <FormControl placeholder="Компания" readOnly
                                             valueLink={linkState(this, 'worker.stockOwnerCompany.name')}/>
                            </Col>
                        </FormGroup>
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
                                <DatePicker
                                    value={this.state.worker.birthday}
                                    onChange={(date) => {
                                        var newWorker = _.extend({}, this.state.worker);
                                        newWorker.birthday = date;
                                        this.setState({worker: newWorker});
                                    }}
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
