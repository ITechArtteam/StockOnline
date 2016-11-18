import React from 'react'
import {Link} from 'react-router'
import "./navigation.css"
import {connect} from "react-redux";

class Navigation extends React.Component {

    constructor(props){
        super(props);
        this.checkRoles = this.checkRoles.bind(this);
    }

    checkRoles(roles){
        for (let myIterator = 0; myIterator < roles.length; myIterator++) {
            if ($.inArray(roles[myIterator], this.props.roles) != -1) {
                return "";
            }
        }
        return "none";
    }

    render() {
        return (
            <nav role="navigation">
                <ul className="nav nav-pills nav-stacked ">
                    <li><Link to="/">Войти</Link></li>
                    <li className={this.checkRoles(["SUPER_ADMIN", "2354"])}><Link to="/clients" role="button">Клиенты</Link></li>
                    <li className={this.checkRoles(["SUPER_ADMIN"])}><Link to="/client/">Редактировать клиента</Link></li>
                    <li className={this.checkRoles(["BOSS_STOCK"])}><Link to="/reports">Отчеты</Link></li>
                    <li className={this.checkRoles(["SUPER_ADMIN"])}><Link to="/report/income">Отчет о прибыли</Link></li>
                    <li className={this.checkRoles(["BOSS_STOCK"])}><Link to="/report/standard">Стандартные отчеты прибыли</Link></li>
                    <li className={this.checkRoles(["ADMIN"])}><Link to="/stocks">Склады</Link></li>
                    <li className={this.checkRoles(["ADMIN"])}><Link to="/stock/:id">Редактировать кладс</Link></li>
                    <li className={this.checkRoles(["ADMIN"])}><Link to="/workers">Сотрудники</Link></li>
                    <li className={this.checkRoles(["ADMIN"])}><Link to="/worker/:id">Редактировать сотрудника</Link></li>
                    <li className={this.checkRoles(["DISPATCHER"])}><Link to="/carriers">Перевозчики</Link></li>
                    <li className={this.checkRoles(["DISPATCHER"])}><Link to="/carrier/:id">Редактировать перевозчика</Link></li>
                    <li className={this.checkRoles(["DISPATCHER"])}><Link to="/drivers">Водители</Link></li>
                    <li className={this.checkRoles(["DISPATCHER"])}><Link to="/driver/:id">Редактировать водителя</Link></li>
                    <li className={this.checkRoles(["DISPATCHER"])}><Link to="/waybills">Накладные</Link></li>
                    <li className={this.checkRoles(["DISPATCHER"])}><Link to="/waybill/:id">Создать накладную</Link></li>
                    <li className={this.checkRoles(["MANAGER"])}><Link to="/goods/receipt">Поступление товара</Link></li>
                    <li className={this.checkRoles(["MANAGER"])}><Link to="/goods/distribution">Распределение товара</Link></li>
                    <li className={this.checkRoles(["MANAGER"])}><Link to="/goods/departure">Убытие товара</Link></li>
                    <li className={this.checkRoles(["CONTROLLER"])}><Link to="/goods/check">Проверка товара</Link></li>
                    <li className={this.checkRoles(["BOSS_STOCK", "CONTROLLER"])}><Link to="/goods">Товары</Link></li>
                    <li className={this.checkRoles(["BOSS_STOCK"])}><Link to="/acts">Акты</Link></li>
                    <li className={this.checkRoles(["CONTROLLER"])}><Link to="/act/:id">Редактировать акт</Link></li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        roles: state.auth.roles
    };
}

export default connect(
    mapStateToProps
)(Navigation);
