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
            <div className="row">
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
                     <input
                        type={"text"}
                        value="Имя"
                        className="form-control"
                        disabled="true"
                    />
                    <input
                        type={"text"}
                        value="Фамилия"
                        className="form-control"
                        disabled="true"
                    />
                    <input
                        type={"text"}
                        value="Отчество"
                        className="form-control"
                        disabled="true"
                    />
                    <input
                        type={"text"}
                        value="День рождения"
                        className="form-control"
                        disabled="true"
                    />
                    <input
                        type={"text"}
                        value="Кем выдан паспорт"
                        className="form-control"
                        disabled="true"
                    />
                    <input
                        type={"text"}
                        value="Когда выдан паспорт"
                        className="form-control"
                        disabled="true"
                    />
                    <input
                        type={"text"}
                        value="Серия номер паспорта"
                        className="form-control"
                        disabled="true"
                    />
                    <div className="btn-group">
                        <Link activeClassName={"btn btn-lg btn-primary"} to="/registrationOfGoods/driver">Продолжить</Link>
                        <Link activeClassName={"btn btn-lg btn-primary"} to="/registrationOfGoods/driver">Зарегистрировать водителя</Link>
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
