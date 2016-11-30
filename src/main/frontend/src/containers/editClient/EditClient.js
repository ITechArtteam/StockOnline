import React from 'react';
import {SimpleInput} from '../../components/SimpleInput';
import {clientActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';
import {AlertPopup} from '../../components/AlertPopup';
import {Link, browserHistory} from "react-router";

class EditClient extends React.Component {

    constructor(props) {
        super(props);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.validateOnBlur = this.validateOnBlur.bind(this);
        this.swapStatePassword = this.swapStatePassword.bind(this);
        this.submit = this.submit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    closeAlert(){
        this.props.closeAlertPopup();
        if(this.props.client.frontend.messageAlertPop === "Клиен сохранен.")
            browserHistory.push('/clients');
    }

    validateOnChange(e, patternType) {
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "Login": {
                if (!new RegExp("^[a-z_а-я]*$", "iu").test(value)) {
                    this.props.setInputError(nameField, "Только буквы и символ подчеркивание \"_\".");
                }
                break;
            }
            case "Integer": {
                if (!new RegExp("^[0-9]*$", "iu").test(value)) {
                    this.props.setInputError(nameField, "Только числа");
                }
                break;
            }
        }
        this.props.setClientData(nameField, value);
    }

    validateOnBlur(e, patternType){
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "isRequired":
            case "Login": {
                if (value.length < 3){
                    this.props.setInputError(nameField, "Минимум 3 символа.");
                }
                break;
            }
            case "Email": {
                if (!new RegExp("^[a-z_]+[0-9a-z_\u002E\u005F]*[a-z0-9_]+@([a-z]){2,10}\u002E[a-z]{2,4}$", "iu")
                        .test(value)) {
                    this.props.setInputError(nameField, "Несуществующий email. Верный формат: \"x@xx.xx\"");
                }
                break;
            }
        }
    }

    swapStatePassword(e){
        this.props.setVisibilityPassword(e.target.id);
    }

    componentWillMount() {
        if (!!this.props.params.name) {
            this.props.getClient(this.props.params.name);
        }
    }

    submit(){
        const errors = this.props.client.inputErrors;
        for(let field in errors){
            if (errors[field].length > 0){
                this.props.showAlertPopup("danger", "Исправь ошибки ввода.");
                return;
            }
        }
        if (this.props.client.data.name < 3){
            this.props.setInputError("name", "Введите имя.");
            return;
        }
        if (this.props.client.data.adminLogin < 3){
            this.props.setInputError("adminLogin", "Введите логин.");
            return;
        }
        if (this.props.client.data.adminPassword < 3 && this.props.client.data.id == -1){
            this.props.setInputError("adminPassword", "Введите пароль.");
            return;
        }
        if (this.props.client.data.adminEmail < 7){
            this.props.setInputError("adminEmail", "Введите email.");
            return;
        }
        this.props.addClient(this.props.client.data);
    }

    componentWillUnmount(){
        this.props.setDefaultValue();
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-5 col-xs-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">Информация о компании-клиенте</div>
                        <div className="panel-body">
                            <SimpleInput id="name"
                                         label="Название компании*"
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.name}
                                         onBlur={this.validateOnBlur}
                                         patternType="isRequired"
                                         errorValue={this.props.client.inputErrors.name}/>

                            <SimpleInput id="country"
                                         label="Страна"
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.country}
                                         errorValue={this.props.client.inputErrors.country}
                                         patternType="SimpleName"/>

                            <SimpleInput id="city"
                                         label="Город"
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.city}
                                         errorValue={this.props.client.inputErrors.city}
                                         patternType="SimpleName"/>

                            <SimpleInput id="street"
                                         label="Улица"
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.street}
                                         errorValue={this.props.client.inputErrors.street}
                                         patternType="SimpleName"/>

                            <SimpleInput id="home"
                                         label="Дом"
                                         length={7}
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.home}
                                         errorValue={this.props.client.inputErrors.home}
                                         patternType="Integer"/>

                            <SimpleInput id="room"
                                         label="Квартира"
                                         length={7}
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.room}
                                         errorValue={this.props.client.inputErrors.room}
                                         patternType="Integer"/>
                            <SimpleInput id="adminEmail"
                                         label="Email администратора*"
                                         onBlur={this.validateOnBlur}
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.adminEmail}
                                         errorValue={this.props.client.inputErrors.adminEmail}
                                         patternType="Email"
                                         length={40}
                            />

                            <SimpleInput id="adminLogin"
                                         label="Логин администратора*"
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.adminLogin}
                                         errorValue={this.props.client.inputErrors.adminLogin}
                                         patternType="Login"/>

                            <SimpleInput id="adminPassword"
                                         label={this.props.client.data.id == -1 ? "Пароль администратора*" : "Пароль администратора"}
                                         patternType={this.props.client.data.id == -1 ? "isRequired" : ""}
                                         onChange={this.validateOnChange}
                                         value={this.props.client.data.adminPassword}
                                         errorValue={this.props.client.inputErrors.adminPassword}
                                         isPassword={true}
                                         isVisiblePassword={this.props.client.frontend.adminPasswordVisibility}
                                         swapStatePassword={this.swapStatePassword}/>

                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary"
                                        onClick={this.submit}>Сохранить
                                </button>
                                <Link to="/clients" className="btn btn-default">Отменить</Link>
                            </div>
                        </div> {/*div.panel-body end*/}
                    </div>
                </div>
                <AlertPopup isVisible={this.props.client.frontend.showAlertPopup}
                            message={this.props.client.frontend.messageAlertPop}
                            type={this.props.client.frontend.typeAlertPopup}
                            close={this.closeAlert}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClient: (clientName) => {
            dispatch(clientActionCreator.getClient(clientName))
        },
        setClientData: (nameField, fieldValue) => {
            dispatch(clientActionCreator.setFieldData(nameField, fieldValue))
        },
        addClient: (data) => {
            dispatch(clientActionCreator.addClient(data))
        },
        setInputError: (nameField, message) => {
            dispatch(clientActionCreator.setInputErrorMessage(nameField, message))
        },
        setVisibilityPassword: (nameField) => {
            dispatch(clientActionCreator.setVisibilityPassword(nameField))
        },
        showAlertPopup: (type, message) => {
            dispatch(clientActionCreator.showAlertPopup(type, message))
        },
        closeAlertPopup: () => {
            dispatch(clientActionCreator.closeAlertPopup())
        },
        setDefaultValue: () => {
            dispatch(clientActionCreator.setDefaultValue())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditClient);
