import React from 'react';
import {SimpleInput} from '../../components/SimpleInput';
import {driverActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';
import {AlertPopup} from '../../components/AlertPopup';
import {Link, browserHistory} from "react-router";
import DateInput from '../../components/DateInput/DateInput'

class EditDriver extends React.Component {

    constructor(props) {
        super(props);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.validateOnBlur = this.validateOnBlur.bind(this);
        this.submit = this.submit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    closeAlert(){
        this.props.closeAlertPopup();
        if(this.props.driver.frontend.messageAlertPop === "Водитель сохранен.")
            browserHistory.push('/registrationOfGoods/driver');
    }

    validateOnChange(e, patternType) {
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "SimpleName": {

                break;
            }
            case "Integer": {
                if (!new RegExp("^[0-9]*$", "iu").test(value)) {
                    this.props.setInputError(nameField, "Только числа");
                }
                break;
            }
            }
        this.props.setDriverData(nameField, value);
    }

    validateOnBlur(e, patternType){
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "isRequired":
            case "driver": {
                    if (value.length < 1){
                        this.props.setInputError(nameField, "Минимум 1 символа.");
                    }
                    break;
            }
            case "data": {
                if (value.length < 1){
                    this.props.setInputError(nameField, "Минимум 1 символа.");
                }
                break;
            }
        }
    }


    componentWillMount() {
        if (!!this.props.params.id) {
            this.props.getDriver(this.props.params.id);
        }
    }

    submit(){
        const errors = this.props.driver.inputErrors;
        for(let field in errors){
            if (errors[field].length > 0){
                this.props.showAlertPopup("danger", "Исправь ошибки ввода.");
                return;
            }
        }
        if (this.props.driver.data.firstName < 3){
            this.props.setInputError("firstName", "Введите имя.");
            return;
        }
        if (this.props.driver.data.lastName < 3){
            this.props.setInputError("lastName", "Введите фамилию.");
            return;
        }
        if (this.props.driver.data.fatherName < 3){
            this.props.setInputError("patronymic", "Введите отчество.");
            return;
        }
        if (this.props.driver.data.transferCompany < 3){
            this.props.setInputError("transferCompany", "Введите компанию.");
            return;
        }
        if (this.props.driver.data.birthDate < 6){
           this.props.setInputError("birthDate", "Введите компанию.");
           return;
        }
        if (this.props.driver.data.passportNumber < 8){
            this.props.setInputError("passportNumber", "Введите серию и номер паспорта.");
            return;
        }
        if (this.props.driver.data.passportIssuedBy < 3){
            this.props.setInputError("passportIssuedBy", "Введите кем выдан паспорт.");
            return;
        }
        if (this.props.driver.data.passportIssuedDate < 6){
            this.props.setInputError("passportIssuedDate", "Введите дату выдачи паспорта.");
            return;
        }

        this.props.addDriver(this.props.driver.data);
    }

    componentWillUnmount(){
        this.props.setDefaultValue();
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-5 col-xs-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">Информация о водителе</div>
                        <div className="panel-body">
                            <SimpleInput id="transferCompany"
                                label="Перевозчик*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.transferCompany}
                                onBlur={this.validateOnBlur}
                                patternType="driver"
                                errorValue={this.props.driver.inputErrors.transferCompany}
                            />

                            <SimpleInput id="passportNumber"
                                label="Номер паспорта*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.passportNumber}
                                onBlur={this.validateOnBlur}
                                patternType="driver"
                                errorValue={this.props.driver.inputErrors.passportNumber}
                            />

                            <SimpleInput id="passportIssuedBy"
                                label="Кем выдан*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.passportIssuedBy}
                                onBlur={this.validateOnBlur}
                                patternType="driver"
                                errorValue={this.props.driver.inputErrors.passportIssuedBy}
                            />

                            <DateInput
                                value={this.props.driver.data.passportIssuedDate}
                                onChange={this.props.changePassportIssuedDate}
                                label="Дата выдачи"/>
                            <DateInput
                                    value={this.props.driver.data.birthDate}
                                    onChange={this.props.changeBirthDate}
                                    label="Дата рождения"/>

                            <SimpleInput id="firstName"
                                 label="Имя*"
                                 onChange={this.validateOnChange}
                                 value={this.props.driver.data.firstName}
                                 onBlur={this.validateOnBlur}
                                 patternType="driver"
                                 errorValue={this.props.driver.inputErrors.firstName}/>

                            <SimpleInput id="lastName"
                                 label="Фамилия*"
                                 onChange={this.validateOnChange}
                                 value={this.props.driver.data.lastName}
                                 onBlur={this.validateOnBlur}
                                 patternType="driver"
                                 errorValue={this.props.driver.inputErrors.lastName}
                                 />

                            <SimpleInput id="fatherName"
                                 label="Отчество*"
                                 onChange={this.validateOnChange}
                                 value={this.props.driver.data.fatherName}
                                 onBlur={this.validateOnBlur}
                                 errorValue={this.props.driver.inputErrors.fatherName}
                                 patternType="driver"/>



                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary"
                                    onClick={this.submit}>Сохранить
                                </button>
                                <Link to="/registrationOfGoods/driver" className="btn btn-default">Отменить</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <AlertPopup isVisible={this.props.driver.frontend.showAlertPopup}
                            message={this.props.driver.frontend.messageAlertPop}
                            type={this.props.driver.frontend.typeAlertPopup}
                            close={this.closeAlert}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        driver: state.driver
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassportIssuedDate: (date) => {
            dispatch(driverActionCreator.changePassportIssuedDate(date))
        },
        changeBirthDate: (date) => {
            dispatch(driverActionCreator.changeBirthDate(date))
        },
        getDriver: (driverName) => {
            dispatch(driverActionCreator.getDriver(driverName))
        },
        setDriverData: (nameField, fieldValue) => {
            dispatch(driverActionCreator.setFieldData(nameField, fieldValue))
        },
        addDriver: (data) => {
            dispatch(driverActionCreator.addDriver(data))
        },
        setInputError: (nameField, message) => {
            dispatch(driverActionCreator.setInputErrorMessage(nameField, message))
        },
        showAlertPopup: (type, message) => {
            dispatch(driverActionCreator.showAlertPopup(type, message))
        },
        closeAlertPopup: () => {
            dispatch(driverActionCreator.closeAlertPopup())
        },
        setDefaultValue: () => {
            dispatch(driverActionCreator.setDefaultValue())
        }
    }
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDriver);
