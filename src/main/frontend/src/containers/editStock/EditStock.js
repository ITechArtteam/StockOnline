import React from 'react';
import {SimpleInput} from '../../components/SimpleInput';
import {stockActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';
import {AlertPopup} from '../../components/AlertPopup';
import {Link} from "react-router";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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
        if (this.props.stock.data.nameCompany < 3){
            this.props.setInputError("nameCompany", "Введите компанию.");
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
                                 patternType="Integer"/>

                    <SimpleInput id="room"
                                 label="Квартира"
                                 length={7}
                                 onChange={this.validateOnChange}
                                 value={this.props.stock.data.room}
                                 errorValue={this.props.stock.inputErrors.room}
                                 patternType="Integer"/>
                        <SimpleInput id="nameRoom"
                                    label="Имя помещение"
                                    onChange={this.validateOnChange}
                                    value={this.props.stock.data.nameRoom}
                                    errorValue={this.props.stock.inputErrors.nameRoom}
                                    patternType="isRequired"/>
                        <SimpleInput id="type"
                                    label="Тип хранения"
                                    onChange={this.validateOnChange}
                                    value={this.props.stock.data.type}
                                    errorValue={this.props.stock.inputErrors.type}
                                    patternType="isRequired"/>

                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-primary"
                                onClick={this.submit}>Добавить помещение
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={this.submit}>Сохранить
                        </button>
                        <Link to="/stocks" className="btn btn-default">Отменить</Link>
                    </div>
                </div>{/*dib.col-xs-3 end*/}
                <div className="col-xs-9">
                    <BootstrapTable  striped={true} hover={true} ref="table">
                        <TableHeaderColumn headerAlign="center" >Номер помещение</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" >Имя помещение</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" >Тип хранения</TableHeaderColumn>
                        <TableHeaderColumn headerAlign="center" >Количество мест</TableHeaderColumn>
                    </BootstrapTable>
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditStock);
