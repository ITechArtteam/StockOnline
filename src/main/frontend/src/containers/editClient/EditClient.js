import React from 'react'
import SimpleInput from '../../components/SimpleInput'
import {clientActionCreator} from "./index";
import { connect } from 'react-redux'

class EditClient extends React.Component {
    componentWillMount(){
        this.props.getClient(this.props.params.name);
    }
    render(){
        return (
            <div className="row">
                <form className="form-horizontal" id="client_form">
                    <SimpleInput id="name" label="Название компании"
                                 onChange={this.props.setClientData} value={this.props.client.data.name}/>
                    <SimpleInput id="adminLogin" label="Логин администратора"
                                 onChange={this.props.setClientData} value={this.props.client.data.adminLogin}/>
                    <SimpleInput id="adminPassword" label="Пароль администратора"
                                 onChange={this.props.setClientData} value={this.props.client.data.adminPassword}/>
                    <SimpleInput id="bossLogin" label="Логин управляющего"
                                 onChange={this.props.setClientData} value={this.props.client.data.bossLogin}/>
                    <SimpleInput id="bossPassword" label="Пароль управляющего"
                                 onChange={this.props.setClientData} value={this.props.client.data.bossPassword}/>
                    <SimpleInput id="country" label="Страна"
                                 onChange={this.props.setClientData} value={this.props.client.data.country}/>
                    <SimpleInput id="city" label="Город"
                                 onChange={this.props.setClientData} value={this.props.client.data.city}/>
                    <SimpleInput id="street" label="Улица"
                                 onChange={this.props.setClientData} value={this.props.client.data.street}/>
                    <SimpleInput id="home" label="Дом"
                                 onChange={this.props.setClientData} value={this.props.client.data.home}/>
                    <SimpleInput id="room" label="Квартира"
                                 onChange={this.props.setClientData} value={this.props.client.data.room}/>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary" onClick={()=>this.props.addClient(this.props.client)}>Сохранить</button>
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditClient);
