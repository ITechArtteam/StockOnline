import React from 'react';
import SimpleInput from '../../components/SimpleInput/SimpleInput';
import {clientActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';

class EditClient extends React.Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.swapStatePassword = this.swapStatePassword.bind(this);
    }

    validate(e, patternType) {
        this.props.setInputError(e, "");
        switch (patternType) {
            case "SimpleName": {
                if (!new RegExp("^[a-z_а-я]*$", "iu").test(e.target.value)) {
                    this.props.setInputError(e, "Только буквы и подчеркивание.");
                }
                break;
            }
            case "Integer": {
                if (!new RegExp("^[0-9]*$", "iu").test(e.target.value)) {
                    console.log("23456");
                    this.props.setInputError(e, "Только числа");
                }
                break;
            }
        }
        this.props.setClientData(e);
    }

    swapStatePassword(e){
        this.props.setVisibilityPassword(e)
    }

    componentWillMount() {
        if (!!this.props.params.name) {
            this.props.getClient(this.props.params.name);
        }
    }

    render() {
        return (
            <div className="row">
                <h3> Редактирование клиентов.</h3>

                <form className="form-horizontal" id="client_form" autoComplete="off">
                    <SimpleInput id="name" label="Название компании" onChange={this.validate}
                                 value={this.props.client.data.name}
                                 errorValue={this.props.client.inputErrors.name} patternType="SimpleName"/>
                    <SimpleInput id="adminLogin" label="Логин администратора"
                                 onChange={this.validate} value={this.props.client.data.adminLogin}
                                 errorValue={this.props.client.inputErrors.adminLogin} patternType="SimpleName"/>
                    <SimpleInput id="adminPassword" label="Пароль администратора"
                                 onChange={this.validate} value={this.props.client.data.adminPassword}
                                 isPassword={true}
                                 isVisiblePassword={this.props.client.data.adminPasswordVisibility}
                                 swapStatePassword={this.swapStatePassword}/>
                    <SimpleInput id="bossLogin" label="Логин управляющего"
                                 onChange={this.validate} value={this.props.client.data.bossLogin}
                                 errorValue={this.props.client.inputErrors.bossLogin} patternType="SimpleName"/>
                    <SimpleInput id="bossPassword" label="Пароль управляющего"
                                 onChange={this.validate} value={this.props.client.data.bossPassword}
                                 isPassword={true}
                                 isVisiblePassword={this.props.client.data.bossPasswordVisibility}
                                 swapStatePassword={this.swapStatePassword}/>
                    <SimpleInput id="country" label="Страна"
                                 onChange={this.validate} value={this.props.client.data.country}
                                 errorValue={this.props.client.inputErrors.country} patternType="SimpleName"/>
                    <SimpleInput id="city" label="Город"
                                 onChange={this.validate} value={this.props.client.data.city}
                                 errorValue={this.props.client.inputErrors.city} patternType="SimpleName"/>
                    <SimpleInput id="street" label="Улица"
                                 onChange={this.validate} value={this.props.client.data.street}
                                 errorValue={this.props.client.inputErrors.street} patternType="SimpleName"/>
                    <SimpleInput id="home" label="Дом"
                                 onChange={this.validate} value={this.props.client.data.home}
                                 errorValue={this.props.client.inputErrors.home} patternType="Integer"/>
                    <SimpleInput id="room" label="Квартира"
                                 onChange={this.validate} value={this.props.client.data.room}
                                 errorValue={this.props.client.inputErrors.room} patternType="Integer"/>
                    <div className="btn-group col-sm-offset-3 col-md-offset-3 col-lg-offset-3" role="group">
                        <button type="button" className="btn btn-primary"
                                onClick={()=>this.props.addClient(this.props.client)}>Сохранить
                        </button>
                        <button type="button" className="btn btn-default">Отменить</button>
                    </div>
                </form>
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
        setClientData: (e) => {
            dispatch(clientActionCreator.setData(e.target.id, e.target.value))
        },
        addClient: (clientData) => {
            dispatch(clientActionCreator.addClient(clientData.data))
        },
        setInputError: (e, message) => {
            dispatch(clientActionCreator.setInputErrorMessage(e.target.id, message))
        },
        setVisibilityPassword: (e) => {
            dispatch(clientActionCreator.setVisibilityPassword(e.target.id))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditClient);
