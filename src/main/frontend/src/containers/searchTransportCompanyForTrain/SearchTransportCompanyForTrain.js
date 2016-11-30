import React from 'react';
import {searchTransportCompanyForTrainActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';
import {AlertPopup} from '../../components/AlertPopup';
import {Link} from "react-router";

class SearchTransportCompanyForTrain extends React.Component {

    constructor(props) {
        super(props);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.getClassForError = this.getClassForError.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.searchCompany = this.searchCompany.bind(this);
    }

    componentWillUnmount(){
        this.props.setDefaultValue();
    }

    validateOnChange(e) {
        const value = e.target.value;
        this.props.setTransferCompanyName("transferCompanyName", value);
    }

    getClassForError() {
        return this.props.train.inputErrors.transferCompanyName == "" ? "none" : "inputError";
    }

    closeAlert() {
        this.props.closeAlertPopup();
    }

    searchCompany(){
        this.props.getCompany(this.props.train.data.transferCompanyName);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div
                        className="well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <label className="control-label" htmlFor="transferCompanyName">Наименование перевозчика</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="transferCompanyName"
                                placeholder="Наименование перевозчика"
                                onChange={this.validateOnChange}
                                value={this.props.train.data.transferCompanyName}/>
                            <span className="input-group-btn">
                                <button onClick={this.searchCompany} className="btn btn-default"
                                        type="button">Далее</button>
                            </span>
                        </div>
                        <div className="row">
                            <label
                                className={this.getClassForError()}>{this.props.train.inputErrors.transferCompanyName}</label>
                        </div>
                    </div>
                    <AlertPopup isVisible={this.props.train.frontend.showAlertPopup}
                                message={this.props.train.frontend.messageAlertPop}
                                type={this.props.train.frontend.typeAlertPopup}
                                close={this.closeAlert}
                                buttons={this.props.train.frontend.buttons}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        train: state.searchTransportCompanyForTrain
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAlertPopup: (type, message) => {
            dispatch(searchTransportCompanyForTrainActionCreator.showAlertPopup(type, message))
        },
        closeAlertPopup: () => {
            dispatch(searchTransportCompanyForTrainActionCreator.closeAlertPopup())
        },
        setTransferCompanyName: (nameField, fieldValue) => {
            dispatch(searchTransportCompanyForTrainActionCreator.setFieldData(nameField, fieldValue))
        },
        setInputError: (nameField, message) => {
            dispatch(searchTransportCompanyForTrainActionCreator.setInputErrorMessage(nameField, message))
        },
        setDefaultValue: () => {
            dispatch(searchTransportCompanyForTrainActionCreator.setDefaultValue())
        },
        getCompany: (transferCompanyName) => {
            dispatch(searchTransportCompanyForTrainActionCreator.getTrain(transferCompanyName))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchTransportCompanyForTrain);
