import React from 'react'
import SimpleInput from '../components/SimpleInput'
import {client} from "../actions";
import { connect } from 'react-redux'

class EditClient extends React.Component {

    render(){
        return (
            <div className="container">
                <form className="form-horizontal" id="client_form">
                    <SimpleInput id="company_name" label="Название компании"/>
                    <SimpleInput id="admin_login" label="Логин администратора"/>
                    <SimpleInput id="admin_password" label="Пароль администратора"/>
                    <SimpleInput id="boss_login" label="Логин администратора"/>
                    <SimpleInput id="country" label="Страна"/>
                    <SimpleInput id="city" label="Город"/>
                    <SimpleInput id="street" label="Улица"/>
                    <SimpleInput id="home" label="Дом"/>
                    <SimpleInput id="room" label="Квартира"/>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group" role="group">
                                <button type="submit" className="btn btn-primary">Сохранить</button>
                                <button type="button" className="btn btn-default" onClick={()=>this.props.fetchClientData("dima")}>Отменить</button>
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
        text: state.client.text
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClientData: (name) => {
            dispatch(client.fetchClientData(name))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditClient);
