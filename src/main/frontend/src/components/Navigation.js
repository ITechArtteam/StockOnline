import React from 'react'
import {Link} from 'react-router'

class Navigation extends React.Component {
    render() {
        return (
            <nav role="navigation">
                <ul className="nav nav-pills nav-stacked ">
                    <li><Link to="/">Войти</Link></li>
                    <li><Link to="/clients" role="button">Клиенты</Link></li>
                    <li><Link to="/client/">Редактировать клиента</Link></li>
                    <li><Link to="/reports">Отчеты</Link></li>
                    <li><Link to="/report/income">Отчет о прибыли</Link></li>
                    <li><Link to="/report/standard">Стандартные отчеты прибыли</Link></li>
                    <li><Link to="/stocks">Склады</Link></li>
                    <li><Link to="/stock/:id">Редактировать кладс</Link></li>
                    <li><Link to="/workers">Сотрудники</Link></li>
                    <li><Link to="/worker/:id">Редактировать сотрудника</Link></li>
                    <li><Link to="/carriers">Перевозчики</Link></li>
                    <li><Link to="/carrier/:id">Редактировать перевозчика</Link></li>
                    <li><Link to="/drivers">Водители</Link></li>
                    <li><Link to="/driver/:id">Редактировать водителя</Link></li>
                    <li><Link to="/waybills">Накладные</Link></li>
                    <li><Link to="/waybill/:id">Создать накладную</Link></li>
                    <li><Link to="/goods/receipt">Поступление товара</Link></li>
                    <li><Link to="/goods/distribution">Распределение товара</Link></li>
                    <li><Link to="/goods/departure">Убытие товара</Link></li>
                    <li><Link to="/goods/check">Проверка товара</Link></li>
                    <li><Link to="/goods">Товары</Link></li>
                    <li><Link to="/acts">Акты</Link></li>
                    <li><Link to="/act/:id">Редактировать акт</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;
