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
        if(this.props.driver.frontend.messageAlertPop === "Водитель сохранен."){
            browserHistory.push(`/registrationOfGoods/driver/${this.props.driver.data.passportNumber}`);
        }
    }

    validateOnChange(e, patternType) {
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "SimpleName": {

                break;
            }
            case "driver": {
                if (value.length < 1){
                    this.props.setInputError(nameField, "Минимум 1 символа.");
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
        }else{
            this.props.setInputError("firstName", "");
        }
        if (this.props.driver.data.lastName < 3){
            this.props.setInputError("lastName", "Введите фамилию.");
            return;
        }else{
            this.props.setInputError("lastName", "");
        }
        if (this.props.driver.data.fatherName < 3){
            this.props.setInputError("fatherName", "Введите отчество.");
            return;
        }else{
            this.props.setInputError("fatherName", "");
        }
        if (this.props.driver.data.transferCompany < 3){
            this.props.setInputError("transferCompany", "Введите компанию.");
            return;
        }else{
            this.props.setInputError("transferCompany", "");
        }
        if (this.props.driver.data.birthDate < 6){
            this.props.showAlertPopup("danger", "Введите дату рождения.");
            return;
        }else{
            this.props.setInputError("birthDate", "");
        }
        if (!new RegExp("^[a-z]{2,4}[0-9]{3,10}$", "iu").test(this.props.driver.data.passportNumber)) {
            this.props.setInputError("passportNumber", "Только английские буквы и цифры. Формат:  буквы{2-4}цифры{3-10}");
            return;
        }else{
            this.props.setInputError("passportNumber", "");
        }
        if (this.props.driver.data.passportIssuedBy < 3){
            this.props.setInputError("passportIssuedBy", "Введите кем выдан паспорт.");
            return;
        }else{
            this.props.setInputError("passportIssuedBy", "");
        }
        if (this.props.driver.data.passportIssuedDate < 6){
            this.props.showAlertPopup("danger", "Введите дату выдачи.");
            return;
        } else{
            this.props.setInputError("passportIssuedDate", "");
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
                            <SimpleInput id="firstName"
                                label="Имя*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.firstName}
                                patternType="isRequired"
                                errorValue={this.props.driver.inputErrors.firstName}/>

                            <SimpleInput id="lastName"
                                label="Фамилия*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.lastName}
                                patternType="isRequired"
                                errorValue={this.props.driver.inputErrors.lastName}/>

                            <SimpleInput id="fatherName"
                                label="Отчество*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.fatherName}
                                errorValue={this.props.driver.inputErrors.fatherName}
                                patternType="isRequired"/>

                            <DateInput
                                value={this.props.driver.data.birthDate}
                                onChange={this.props.changeBirthDate}
                                label="Дата рождения"/>
                                    <SimpleInput id="passportNumber"
                                label="Номер паспорта*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.passportNumber}
                                patternType="isRequired"
                                errorValue={this.props.driver.inputErrors.passportNumber}/>

                            <DateInput
                                value={this.props.driver.data.passportIssuedDate}
                                onChange={this.props.changePassportIssuedDate}
                                label="Дата выдачи"/>

                            <SimpleInput id="passportIssuedBy"
                                label="Кем выдан*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.passportIssuedBy}
                                patternType="isRequired"
                                errorValue={this.props.driver.inputErrors.passportIssuedBy}/>

                            <SimpleInput id="transferCompany"
                                label="Перевозчик*"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.transferCompany}
                                patternType="isRequired"
                                errorValue={this.props.driver.inputErrors.transferCompany}
                            />

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
