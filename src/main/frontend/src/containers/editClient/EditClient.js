import React from 'react';
import SimpleInput from '../../components/SimpleInput/SimpleInput';
import {clientActionCreator} from "./index";
import {connect} from 'react-redux';


class EditClient extends React.Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
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

    componentWillMount() {
        if (!!this.props.params.name) {
            this.props.getClient(this.props.params.name);
        }
    }

    render() {
        return (
            <div className="row">
                <h3> Редактирование клиентов.</h3>

                <form className="form-horizontal" id="client_form">
                    <SimpleInput id="name" label="Название компании" onChange={this.validate}
                                 value={this.props.client.data.name}
                                 errorValue={this.props.client.inputErrors.name} patternType="SimpleName"/>
                    <SimpleInput id="adminLogin" label="Логин администратора"
                                 onChange={this.validate} value={this.props.client.data.adminLogin}
                                 errorValue={this.props.client.inputErrors.adminLogin} patternType="SimpleName"/>
                    <SimpleInput id="adminPassword" label="Пароль администратора" type="password"
                                 onChange={this.validate} value={this.props.client.data.adminPassword}/>
                    <SimpleInput id="bossLogin" label="Логин управляющего"
                                 onChange={this.validate} value={this.props.client.data.bossLogin}
                                 errorValue={this.props.client.inputErrors.bossLogin} patternType="SimpleName"/>
                    <SimpleInput id="bossPassword" label="Пароль управляющего" type="password"
                                 onChange={this.validate} value={this.props.client.data.bossPassword}/>
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
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary"
                                        onClick={()=>this.props.addClient(this.props.client)}>Сохранить
                                </button>
                                <button type="button" className="btn btn-default">Отменить</button>
                            </div>
                        </div>
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditClient);
