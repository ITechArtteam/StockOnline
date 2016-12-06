import React from 'react';
import {SimpleInput} from '../../components/SimpleInput';
import {stockActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';
import {AlertPopup} from '../../components/AlertPopup';
import {Link, browserHistory} from "react-router";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Rooms from './rooms/Rooms'

class EditStock extends React.Component {

    constructor(props) {
        super(props);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.validateOnBlur = this.validateOnBlur.bind(this);
        this.submit = this.submit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    closeAlert(){
        this.props.closeAlertPopup();
        if(this.props.stock.frontend.messageAlertPop === "Склад сохранен.")
            browserHistory.push('/stocks');
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
        this.props.setStockData(nameField, value);
    }

    validateOnBlur(e, patternType){
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        switch (patternType) {
            case "isRequired":
            case "nameStock": {
                if (value.length < 3){
                    this.props.setInputError(nameField, "Минимум 1 символа.");
                }
                break;
            }
        }
    }


    componentWillMount() {
        if (!!this.props.params.name) {
            this.props.getStock(this.props.params.name);
        }
    }

    submit(){
        const errors = this.props.stock.inputErrors;
        for(let field in errors){
            if (errors[field].length > 0){
                this.props.showAlertPopup("danger", "Исправь ошибки ввода.");
                return;
            }
        }
        if (this.props.stock.data.name < 3){
            this.props.setInputError("name", "Введите имя.");
            return;
        }
        if (this.props.stock.data.country < 3){
            this.props.setInputError("country", "Введите страну.");
            return;
        }
        if (this.props.stock.data.city < 3){
            this.props.setInputError("city", "Введите город.");
            return;
        }
        if (this.props.stock.data.street < 3){
            this.props.setInputError("street", "Введите улицу.");
            return;
        }
        if (this.props.stock.data.home < 1){
            this.props.setInputError("home", "Введите дом.");
            return;
        }

        this.props.addStock(this.props.stock.data);
    }

    componentWillUnmount(){
        this.props.setDefaultValue();
    }

    render() {
        var rooms = [];

        const cellEditProp = {
            mode: 'click'
        };
        return (
            <div className="row">
                <div className="col-xs-3">
                    <SimpleInput id="name"
                                 label="Склад*"
                                 onChange={this.validateOnChange}
                                 value={this.props.stock.data.name}
                                 onBlur={this.validateOnBlur}
                                 patternType="isRequired"
                                 errorValue={this.props.stock.inputErrors.name}/>

                    <SimpleInput id="country"
                                 label="Страна*"
                                 onChange={this.validateOnChange}
                                 value={this.props.stock.data.country}
                                 errorValue={this.props.stock.inputErrors.country}
                                 patternType="isRequired"/>

                    <SimpleInput id="city"
                                 label="Город*"
                                 onChange={this.validateOnChange}
                                 value={this.props.stock.data.city}
                                 errorValue={this.props.stock.inputErrors.city}
                                 patternType="isRequired"/>

                    <SimpleInput id="street"
                                 label="Улица*"
                                 onChange={this.validateOnChange}
                                 value={this.props.stock.data.street}
                                 errorValue={this.props.stock.inputErrors.street}
                                 patternType="isRequired"/>

                    <SimpleInput id="home"
                                 label="Дом*"
                                 length={7}
                                 onChange={this.validateOnChange}
                                 value={this.props.stock.data.home}
                                 errorValue={this.props.stock.inputErrors.home}
                                 patternType="isRequired"/>

                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-primary"
                                onClick={this.submit}>Сохранить
                        </button>
                        <Link to="/stocks" className="btn btn-default">Отменить</Link>
                    </div>
                </div>{/*dib.col-xs-3 end*/}
                <div className="col-xs-9">
                <Rooms />
                </div>{/*div.col-xs-9 end*/}
                <AlertPopup isVisible={this.props.stock.frontend.showAlertPopup}
                            message={this.props.stock.frontend.messageAlertPop}
                            type={this.props.stock.frontend.typeAlertPopup}
                            close={this.closeAlert}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stock: state.stock
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStock: (stocktName) => {
            dispatch(stockActionCreator.getStock(stockName))
        },
        setStockData: (nameField, fieldValue) => {
            dispatch(stockActionCreator.setFieldData(nameField, fieldValue))
        },
        addStock: (data) => {
            dispatch(stockActionCreator.addStock(data))
        },
        setInputError: (nameField, message) => {
            dispatch(stockActionCreator.setInputErrorMessage(nameField, message))
        },
        showAlertPopup: (type, message) => {
            dispatch(stockActionCreator.showAlertPopup(type, message))
        },
        closeAlertPopup: () => {
            dispatch(stockActionCreator.closeAlertPopup())
        },
        setDefaultValue: () => {
            dispatch(stockActionCreator.setDefaultValue())
        },
        addRoom:(room) => {
            dispatch(stockActionCreator.addRoom(room))
        },
        loadUnits: () => {
            dispatch(stockActionCreator.loadUnits())
        },
        clearAddRoomModalFormFields:() => {
            dispatch(stockActionCreator.clearAddRoomModalFormFields())
        },
        hideAddRoomModalForm:() => {
            dispatch(stockActionCreator.hideAddRoomModalForm())
        },
        changeRoomNumber:(number) => {
            dispatch(stockActionCreator.changeRoomNumber(number))
        },
        changeRoomCost:(cost) => {
            dispatch(stockActionCreator.changeRoomCost(cost))
        },
        changeRoomStorage:(storage) => {
            dispatch(stockActionCreator.changeRoomStorage(storage))
        },
        selectRoom:(number) => {
            dispatch(stockActionCreator.selectRoom(number))
        },
        deleteRoom:(number) => {
            dispatch(stockActionCreator.deleteRoom(number))
        },
        selectRoomUnit:(unit) => {
            dispatch(stockActionCreator.selectRoomUnit(unit))
        },
        setUnits:(units) => {
            dispatch(stockActionCreator.setUnits(units))
        }
    }
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditStock);
