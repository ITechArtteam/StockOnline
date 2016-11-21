import React from "react";
import {connect} from "react-redux";
import "./style.css";
import {AlertPopup} from "../../components/AlertPopup";
import {SimpleInput} from "../../components/SimpleInput";
import {StaticControl} from "../../components/StaticControl";
import {searchTransportCompanyForDriverActionCreator} from "./index";
import {Link} from "react-router";

class SearchTransportCompanyForDriver extends React.Component {

    constructor(props) {
        super(props);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.validateOnBlur = this.validateOnBlur.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    closeAlert() {
        this.props.closeAlertPopup();
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

        }
        this.props.setClientData(nameField, value);
    }

    validateOnBlur(e, patternType) {
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "Login": {
                if (value.length < 3) {
                    this.props.setInputError(nameField, "Минимум 3 символа.");
                }
                break;
            }
        }
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
                                onBlur={this.validateOnBlur}>{this.props.driver.searchNumber}</input>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">Найти</button>
                            </span>
                        </div>
                        <div className="btn-group function-button-group" role="group">
                            <Link to="/clients" className="btn btn-primary">Продолжить</Link>
                            <Link to="/clients" className="btn btn-default">Новый</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div
                        className="form-horizontal well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <legend>Паспортные данные</legend>
                        <StaticControl label={"Кем выдан:"} value={this.props.driver.issued_by}/>
                        <StaticControl label={"Когда выдан:"} value={this.props.driver.issued_date}/>
                        <StaticControl label={"Серия и номер:"} value={this.props.driver.serialAndNumber}/>
                    </div>
                </div>
                <div className="row">
                    <div
                        className="form-horizontal well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <legend>Личные данные</legend>
                        <StaticControl label={"Имя:"} value={this.props.driver.name}/>
                        <StaticControl label={"Фамилия:"} value={this.props.driver.surname}/>
                        <StaticControl label={"Отчество:"} value={this.props.driver.patronymic}/>
                        <StaticControl label={"Дата рождения:"} value={this.props.driver.birthday}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        driver: state.searchTransportCompanyForDriver
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
        setClientData: (nameField, fieldValue) => {
            dispatch(searchTransportCompanyForDriverActionCreator.setFieldData(nameField, fieldValue))
        },
        setInputError: (nameField, message) => {
            dispatch(searchTransportCompanyForDriverActionCreator.setInputErrorMessage(nameField, message))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchTransportCompanyForDriver);
