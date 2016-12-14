import React from "react";
import {connect} from "react-redux";
import "./style.css";
import {AlertPopup} from "../../components/AlertPopup";
import {SimpleInput} from "../../components/SimpleInput";
import {StaticControl} from "../../components/StaticControl";
import {Link, browserHistory} from "react-router";
import {searchTransportCompanyForDriverActionCreator} from "./index";
import moment from "moment";
import {setDriverInfo, setTransportType} from "../WaybillRegistration/actions.js";

class SearchTransportCompanyForDriver extends React.Component {

    constructor(props) {
        super(props);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.searchNumber = this.searchNumber.bind(this);
        this.getClassForError = this.getClassForError.bind(this);
        this.getClassForNextButton = this.getClassForNextButton.bind(this);
        this.next = this.next.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getDate(longTime){
        if (longTime !== "") {
            return new Date(longTime).toDateString();
        }
        return "";
    }

    searchNumber() {
        if (this.props.driver.inputErrors.searchNumber != undefined && this.props.driver.inputErrors.searchNumber.length > 0) {
            this.props.showAlertPopup("danger", "Исправь ошибки ввода.");
            return;
        }
        if (!new RegExp("^[a-z]{2,4}[0-9]{3,10}$", "iu").test(this.props.driver.data.searchNumber)) {
            this.props.setInputError("searchNumber", "Только английские буквы и цифры. Формат:  буквы{2-4}цифры{3-10}");
            return;
        }
        this.props.getDriver(this.props.driver.data.searchNumber);
    }

    componentWillUnmount() {
        this.props.setDefaultValue();
    }

    componentWillMount() {
        if (!!this.props.params.passportNumber)
            this.props.getDriver(this.props.params.passportNumber);
    }


    closeAlert() {
        this.props.closeAlertPopup();
    }

    validateOnChange(e) {
        const value = e.target.value;
        this.props.setInputError("searchNumber", "");
        if (!new RegExp("^[0-9a-z]*$", "iu").test(value)) {
            this.props.setInputError("searchNumber", "Только английские буквы и цифры.");
        }
        this.props.setNumber("searchNumber", value);
    }

    getClassForError() {
        return this.props.driver.inputErrors.searchNumber == "" ? "none" : "inputError passportNumberError";
    }

    getClassForNextButton() {
        let className = "btn btn-primary";
        if (!this.props.driver.frontend.isActiveNextButton) {
            className += " disabled";
        }
        return className;
    }

    next() {
        if (this.props.driver.data.serialAndNumber == undefined){
            return;
        }
        let driver = {
            id: this.props.driver.data.id,
            firstName: this.props.driver.data.name,
            lastName: this.props.driver.data.surname,
            patronymic: this.props.driver.data.patronymic,
            passportNumber: this.props.driver.data.serialAndNumber
        };
        this.props.setDriverInfoInTTN(driver);
        this.props.setTransportType("CAR");
        browserHistory.push('/waybill/export');
    }

    createDiver() {
        browserHistory.push('/goods/departure/editDriver');
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div
                        className="well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <label className="control-label" htmlFor="searchNumber">Серия и номер паспорта</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="searchNumber"
                                placeholder="Серия и номер паспорта"
                                onChange={this.validateOnChange}
                                value={this.props.driver.data.searchNumber}/>
                            <span className="input-group-btn">
                                <button onClick={this.searchNumber} className="btn btn-default"
                                        type="button">Найти</button>
                            </span>
                        </div>
                        <div className="row">
                            <label
                                className={this.getClassForError()}>{this.props.driver.inputErrors.searchNumber}</label>
                        </div>
                        <div className="btn-group function-button-group" role="group">
                            <button onClick={this.next} className={this.getClassForNextButton()}>Продолжить</button>
                            <button onClick={this.createDiver} className="btn btn-default">Новый</button>
                        </div>
                    </div>
                    <AlertPopup isVisible={this.props.driver.frontend.showAlertPopup}
                                message={this.props.driver.frontend.messageAlertPop}
                                type={this.props.driver.frontend.typeAlertPopup}
                                close={this.closeAlert}
                                buttons={this.props.driver.frontend.buttons}
                    />
                </div>
                <div className="row">
                    <div
                        className="form-horizontal well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <legend>Паспортные данные</legend>
                        <StaticControl label={"Кем выдан:"} value={this.props.driver.data.issued_by}/>
                        <StaticControl label={"Когда выдан:"} value={this.getDate(this.props.driver.data.issued_date)}/>
                        <StaticControl label={"Серия и номер:"} value={this.props.driver.data.serialAndNumber}/>
                    </div>
                </div>
                <div className="row">
                    <div
                        className="form-horizontal well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <legend>Личные данные</legend>
                        <StaticControl label={"Имя:"} value={this.props.driver.data.name}/>
                        <StaticControl label={"Фамилия:"} value={this.props.driver.data.surname}/>
                        <StaticControl label={"Отчество:"} value={this.props.driver.data.patronymic}/>
                        <StaticControl label={"Дата рождения:"} value={this.getDate(this.props.driver.data.birthday)}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        driver: state.searchTransportCompanyForDriver,
        TTN: state.waybillRegistrationForm
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAlertPopup: (type, message) => {
            dispatch(searchTransportCompanyForDriverActionCreator.showAlertPopup(type, message))
        },
        closeAlertPopup: () => {
            dispatch(searchTransportCompanyForDriverActionCreator.closeAlertPopup())
        },
        setNumber: (nameField, fieldValue) => {
            dispatch(searchTransportCompanyForDriverActionCreator.setFieldData(nameField, fieldValue))
        },
        setInputError: (nameField, message) => {
            dispatch(searchTransportCompanyForDriverActionCreator.setInputErrorMessage(nameField, message))
        },
        getDriver: (passportNumber) => {
            dispatch(searchTransportCompanyForDriverActionCreator.getDriver(passportNumber))
        },
        setDefaultValue: () => {
            dispatch(searchTransportCompanyForDriverActionCreator.setDefaultValue())
        },
        setDriverInfoInTTN: (driverInfo) => {
            dispatch(setDriverInfo(driverInfo))
        },
        setTransportType: (type) => {
            dispatch(setTransportType(type))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchTransportCompanyForDriver);
