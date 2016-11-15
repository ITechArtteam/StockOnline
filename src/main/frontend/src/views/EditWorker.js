import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from 'react-link-state';
import Select from "react-select";
import DateTimeField from "react-bootstrap-datetimepicker";
import validator from "validator";
class EditWorker extends React.Component {


    constructor(props) {
        super(props);
        console.log(this.props.worker)
    }

    state = {
        worker: this.props.worker,
        date: "1990-06-05",
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date"
    }




    logChange = (val) => {
        console.log("Selected: " + val);
    }

    getValidationFirstNameInputState = () => {
        console.log(this.state.worker.first_name)
        if (validator.isEmpty(this.state.worker.first_name)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationSecondNameInputState = () => {
        if (validator.isEmpty(this.state.worker.second_name)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationPatronymicInputState = () => {
        if (validator.isEmpty(this.state.worker.patronymic)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationEmailInputState = () => {
        if (validator.isEmail(this.state.worker.email)) {
            return 'success'
        } else {
            return 'error';
        }
    }

    getValidationCountryInputState = () => {
        if (validator.isEmpty(this.state.worker.country)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationCityInputState = () => {
        if (validator.isEmpty(this.state.worker.city)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationHouseInputState = () => {
        if (validator.isEmpty(this.state.worker.house)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationApartmentInputState = () => {
        if (validator.isEmpty(this.state.worker.apartment)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationLoginInputState = () => {
        if (validator.isEmpty(this.state.worker.login)) {
            return 'error'
        } else {
            return 'success';
        }
    }

    getValidationPasswordInputState = () => {
        if (validator.isEmpty(this.state.worker.password)) {
            return 'error'
        } else {
            return 'success';
        }
    }


    render() {
        return (
            <Row className="show-grid">
                <Form horizontal id="worker_form">
                    <FormGroup validationState={this.getValidationFirstNameInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Имя
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Имя" valueLink={linkState(this, 'worker.first_name')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationSecondNameInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Фамилия
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.second_name')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationPatronymicInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Отчество
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.patronymic')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Дата рождения
                        </Col>
                        <Col sm={10}>
                            <DateTimeField
                                dateTime={this.state.worker.date}
                                format={this.state.format}
                                viewMode={this.state.mode}
                                inputFormat={this.state.inputFormat}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationEmailInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Электронная почта
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.email')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationCountryInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Страна
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.country')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationCityInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Город
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.city')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationHouseInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Дом
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Дом" valueLink={linkState(this, 'worker.house')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationApartmentInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Квартира
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.apartment')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Роль
                        </Col>
                        <Col sm={10}>
                            <Select name="form-field-name"
                                    options={this.state.options}
                                    onChange={this.logChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationLoginInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Логин
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.login')}/>
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationPasswordInputState()}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Пароль
                        </Col>
                        <Col sm={10}>
                            <FormControl valueLink={linkState(this, 'worker.password')}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Это боле должно быть заполнено.</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <div className="btn-group" role="group">
                                <Button type="submit" bsStyle="primary"
                                        disabled={this.state.valid_form}>Сохранить</Button>
                                <Button>Отмена</Button>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </Row>
        )
    }
}

export default EditWorker;