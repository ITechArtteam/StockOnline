import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import linkState from "react-link-state";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
import "./EditWorker.less";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-bootstrap-date-picker";
import validator from "validator";
import moment from "moment";
import {connect} from "react-redux";
import $ from "jquery";

class EditWorker extends React.Component {
    constructor(props) {
        super(props);


    }

    state = {
        worker: this.props.worker,
        roles: this.props.roles,
        disabledSaveButton: false,
        validationsState: {
            company: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Работник обязательно должен относиться к компании.",
            },
            birthday: {
                status: null,
                message: "",
                isRequred: false,
                rules: [{
                    rule: (text)=> {
                        return moment(text).isBefore(moment());
                    }, message: "Введите реально возможную дату рождения."
                }]
            },
            email: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Электронная почта должна быть заполнена обязательно",
                rules: [{rule: validator.isEmail, message: "Введите валидный email"}]
            },
            login: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Логин должен быть заполнен обязательно",
                rules: [{
                    rule: (text)=> {
                        return (text.length >= 3) && (text.length <= 20);
                    }, message: "Длина логина должна быть от 3 до 20 символов."
                }]
            },
            password: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Пароль должен быть заполнен обязательно",
                rules: [{
                    rule: (text)=> {
                        return (text.length >= 3) && (text.length <= 20);
                    }, message: "Длина пароля должна быть от 3 до 20 символов."
                }]
            },
            surname: {
                status: null,
                message: "",
                isRequred: false,
                rules: [{
                    rule: (text)=> {
                        return (text.length >= 2) && (text.length <= 20);
                    }, message: "Длина Фамилии должна быть от 2 до 20 символов."
                }]
            },
            roles: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Роль должна быть выбрана обязательно."
            },
            home: {
                status: null,
                message: "",
                isRequred: false,
                rules: [{
                    rule: validator.isNumeric, message: "Номер дома должен состоять только из цифр."
                }]
            },
            room: {
                status: null,
                message: "",
                isRequred: false,
                rules: [{
                    rule: validator.isNumeric, message: "Номер квартиры должен состоять только из цифр."
                }]
            }

        }

    };


    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
        this.setState({roles: nextProps.roles, company: nextProps.company});
    }

    componentWillMount() {
        this.updateProps(this.props);
    }


    updateProps = (props)=> {
        var newWorker = _.extend({}, props.worker);
        if (newWorker.birthday) {
            newWorker.birthday = moment(props.worker.birthday).format()
        }
        var stockOwnerCompany = {id: props.company.id, name: props.company.name};
        newWorker.stockOwnerCompany = stockOwnerCompany;
        this.setState({worker: newWorker});
        if ($.isNumeric(newWorker.id)){
            var newValidationsState= _.extend({}, this.state.validationsState);
            newValidationsState.password.isRequred=false;
            this.setState({validationsState: newValidationsState});
            this.preliminaryValidation(newWorker);
        }
        this.validateValue("company",newWorker.stockOwnerCompany.id);
    };

    preliminaryValidation = (newWorker) =>{
        this.validateValue("email",newWorker.email);
        this.validateValue("roles",newWorker.roles);
        this.validateValue("login",newWorker.login);
        this.validateValue("surname",newWorker.surname);
        this.validateValue("birthday",newWorker.birthday);
        this.validateValue("home",newWorker.address.home);
        this.validateValue("room",newWorker.address.room);
    };


    onSaveClick = () => {
        if (this.allValidate()) {
            this.setState({disabledSaveButton: true});
            this.props.onSaveClick(this.state.worker);
            this.setState({disabledSaveButton: false});
        }

    };

    onCloseClick = () => {
        this.props.onCloseClick();
    };


    validateValue = (id, value) => {
        this.validate(id, value);
    };

    validateComponent = (e) => {
        var id = e.target.id;
        var value = e.target.value;
        this.validate(id, value);
    };

    validate = (id, value) => {
        var newValidationsState = _.clone(this.state.validationsState);
        var validationState = newValidationsState[id];
        validationState.test = true;
        if (value==null){
            value="";
        }
        if ($.isNumeric(value)){
            value=String(value);
        }
        if (value.length == 0 && validationState.isRequred) {
            validationState.status = 'error';
            validationState.message = validationState.requredMessage;
        } else {
            if (!(value.length == 0)) {
                var result = true;
                if (validationState.rules) {
                    for (var i = 0; i < validationState.rules.length; i++) {
                        result = result && validationState.rules[i].rule(value);
                        if (!result) {
                            validationState.status = 'error';
                            validationState.message = validationState.rules[i].message;
                            break;
                        }
                    }
                }
                if (validationState.warningRules) {

                    for (var i = 0; i < validationState.warningRules.length; i++) {
                        result = result && validationState.warningRules[i].rule(value);
                        if (!result) {
                            validationState.status = 'warning';
                            validationState.message = validationState.warningRules[i].message;
                            break;
                        }
                    }
                }
                if (result) {
                    if (validationState.isRequred) {
                        validationState.status = 'success';
                        validationState.message = "";
                    } else {
                        validationState.status = null;
                        validationState.message = "";
                    }
                }
            }

        }
        this.setState({validationsState: newValidationsState});
    };

    clean = (e) => {
        var id = e.target.id;
        var newValidationsState = _.clone(this.state.validationsState);
        var validationState = newValidationsState[id];
        validationState.status = null;
        validationState.message = "";
        this.setState({validationsState: newValidationsState});
    };

    cleanById(id) {
        var newValidationsState = _.clone(this.state.validationsState);
        var validationState = newValidationsState[id];
        validationState.status = null;
        validationState.message = "";
        this.setState({validationsState: newValidationsState});
    }


    allValidate = () => {
        var result = true;
        var newValidationsState = _.clone(this.state.validationsState);
        for (var id in newValidationsState) {
            if (newValidationsState[id].test != true && newValidationsState[id].isRequred) {
                result = false;
                newValidationsState[id].status = 'error';
                newValidationsState[id].message = newValidationsState[id].requredMessage;
            } else {
                if ((newValidationsState[id].status != "success")&&(newValidationsState[id].status != null)) {
                    result = false;
                }
            }
        }
        this.setState({validationsState: newValidationsState});
        return result;
    };

    render() {
        return (
            <div>
                <Row className="show-grid">
                    <Form horizontal id="worker_form">
                        <FormGroup validationState={this.state.validationsState.company.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Компания<span className="required-star">*</span>
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Компания" readOnly
                                             valueLink={linkState(this, 'worker.stockOwnerCompany.name')}/>
                                <HelpBlock>{this.state.validationsState.company.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup >
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Имя
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Имя"
                                             valueLink={linkState(this, 'worker.name')}/>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.surname.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Фамилия<span className="required-star">*</span>
                            </Col>
                            <Col sm={6}>
                                <FormControl id="surname" placeholder="Фамилия"
                                             valueLink={linkState(this, 'worker.surname')}
                                             onBlur={this.validateComponent} onClick={this.clean}/>
                                <HelpBlock>{this.state.validationsState.surname.message}</HelpBlock>
                            </Col>

                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Отчество
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Отчество"
                                             valueLink={linkState(this, 'worker.patronymic')}/>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.birthday.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Дата рождения
                            </Col>
                            <Col sm={6}>
                                <DatePicker id="birthday"
                                            value={this.state.worker.birthday}
                                            onChange={(date) => {
                                                var newWorker = _.extend({}, this.state.worker);
                                                newWorker.birthday = date;
                                                this.setState({worker: newWorker});
                                                this.validateValue("birthday", date)
                                                console.log(date)
                                            }} onFocus={this.clean}
                                />
                                <HelpBlock>{this.state.validationsState.birthday.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.email.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Электронная почта<span className="required-star">*</span>
                            </Col>
                            <Col sm={6}>
                                <FormControl id="email" placeholder="Электронная почта"
                                             valueLink={linkState(this, 'worker.email')}
                                             onBlur={this.validateComponent} onClick={this.clean}/>
                                <HelpBlock>{this.state.validationsState.email.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Страна
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Страна"
                                             valueLink={linkState(this, 'worker.address.countryName')}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Город
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Город"
                                             valueLink={linkState(this, 'worker.address.cityName')}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Улица
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Город"
                                             valueLink={linkState(this, 'worker.address.street')}/>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.home.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Дом
                            </Col>
                            <Col sm={6}>
                                <FormControl id="home" placeholder="Дом"
                                             valueLink={linkState(this, 'worker.address.home')}
                                             onBlur={this.validateComponent} onClick={this.clean}/>
                                <HelpBlock>{this.state.validationsState.home.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.room.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Квартира
                            </Col>
                            <Col sm={6}>
                                <FormControl id="room" placeholder="Квартира"
                                             valueLink={linkState(this, 'worker.address.room')}
                                             onBlur={this.validateComponent} onClick={this.clean}/>
                                <HelpBlock>{this.state.validationsState.room.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.roles.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Роль<span className="required-star">*</span>
                            </Col>
                            <Col sm={6}>
                                <Multiselect id="roles" data={this.state.roles}
                                             valueLink={linkState(this, 'worker.roles')}
                                             textField='name'
                                             placeholder="Роли"
                                             valueField='id'
                                             onBlur={()=> {
                                                 this.validateValue("roles", this.state.worker.roles)
                                             }} onSelect={()=> {
                                    this.cleanById("roles")
                                }}/>
                                <HelpBlock>{this.state.validationsState.roles.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.login.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Логин<span className="required-star">*</span>
                            </Col>
                            <Col sm={6}>
                                <FormControl id="login" placeholder="Логин"
                                             valueLink={linkState(this, 'worker.login')}
                                             onBlur={this.validateComponent} onClick={this.clean}/>
                                <HelpBlock>{this.state.validationsState.login.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.validationsState.password.status}>
                            <Col smOffset={2} sm={2} componentClass={ControlLabel}>
                                Пароль<span className="required-star">*</span>
                            </Col>
                            <Col sm={6}>
                                <FormControl id="password" placeholder="Пароль"
                                             valueLink={linkState(this, 'worker.password')}
                                             onBlur={this.validateComponent} onClick={this.clean}/>
                                <HelpBlock>{this.state.validationsState.password.message}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={9}>
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
