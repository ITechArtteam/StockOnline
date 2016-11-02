import React from 'react'
import SimpleInput from '../components/SimpleInput'
import {client} from "../actions";
import { connect } from 'react-redux'

class EditClient extends React.Component {

    render(){
        return (
            <div className="container">
                <form className="form-horizontal" id="client_form">
                    <SimpleInput id="companyName" label="Название компании"
                                 onChange={this.props.setClientData} value={this.props.client.companyName}/>
                    <SimpleInput id="adminLogin" label="Логин администратора"
                                 onChange={this.props.setClientData} value={this.props.client.adminLogin}/>
                    <SimpleInput id="adminPassword" label="Пароль администратора"
                                 onChange={this.props.setClientData} value={this.props.client.adminPassword}/>
                    <SimpleInput id="bossLogin" label="Логин управляющего"
                                 onChange={this.props.setClientData} value={this.props.client.bossLogin}/>
                    <SimpleInput id="bossPassword" label="Пароль управляющего"
                                 onChange={this.props.setClientData} value={this.props.client.bossPassword}/>
                    <SimpleInput id="country" label="Страна"
                                 onChange={this.props.setClientData} value={this.props.client.country}/>
                    <SimpleInput id="city" label="Город"
                                 onChange={this.props.setClientData} value={this.props.client.city}/>
                    <SimpleInput id="street" label="Улица"
                                 onChange={this.props.setClientData} value={this.props.client.street}/>
                    <SimpleInput id="home" label="Дом"
                                 onChange={this.props.setClientData} value={this.props.client.home}/>
                    <SimpleInput id="room" label="Квартира"
                                 onChange={this.props.setClientData} value={this.props.client.room}/>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary" onClick={()=>this.props.addClient(this.props.name)}>Сохранить</button>
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
        addClient: (name) => {
            dispatch(client.addClient(name))
        },
        setClientData: (e) => {
            dispatch(client.setData(e.target.id, e.target.value))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditClient);
