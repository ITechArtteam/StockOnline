import React from "react";
import {searchTransportCompanyForDriverActionCreator} from "./index";
import {connect} from "react-redux";
import "./style.css";
import {AlertPopup} from "../../components/AlertPopup";
import {SimpleInput} from "../../components/SimpleInput";
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

                    <form className="form-search">
                        <div className="input-append">
                            <input type="text" className="search-query"/>
                                <button type="submit" className="btn">Search</button>
                        </div>
                    </form>

                    <form id="driver_search"
                          className="form-horizontal col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <SimpleInput id="passportNumber"
                                     label="Серия и номер паспорта*"
                                     onChange={this.validateOnChange}
                                     value={this.props.searchDriver.data.passportNumber}
                                     onBlur={this.validateOnBlur}
                                     patternType="isRequired"
                                     errorValue={this.props.searchDriver.inputErrors.passportNumber}/>
                    </form>
                    <button className="btn btn-primary">Найти</button>
                </div>
                <div className="row">
                    <dl className="col-sm-3 col-md-3 col-lg-3 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <dt>Имя</dt>
                        <dd>Дмитрий</dd>
                        <dt>Фамилия</dt>
                        <dd>Дмитрий</dd>
                        <dt>Отчество</dt>
                        <dd>Дмитрий</dd>
                        <dt>Дата рождения</dt>
                        <dd>Дмитрий</dd>
                    </dl>

                    <dl className="col-sm-3 col-md-3 col-lg-3">
                        <dt>Кем выдан паспорт</dt>
                        <dd>Дмитрий</dd>
                        <dt>Когда выдан паспорт</dt>
                        <dd>Дмитрий</dd>
                        <dt>Серия номер паспорта</dt>
                        <dd>Дмитрий</dd>
                    </dl>

                </div>
                <div className="btn-group">
                    <Link activeClassName={"btn btn-lg btn-primary"} to="/registrationOfGoods/driver">Продолжить</Link>
                    <Link activeClassName={"btn btn-lg btn-primary"} to="/registrationOfGoods/driver">Зарегистрировать
                        водителя</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchDriver: state.searchTransportCompanyForDriver
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
