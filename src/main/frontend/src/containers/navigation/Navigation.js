import React from "react";
import {connect} from "react-redux";
import "./navigation.css";
import UserInfo from "../../containers/UserInfo";
import NavigationButton from "./NavigationButton";
import {navigationActionCreator} from "./index";
import {browserHistory} from "react-router";

class Navigation extends React.Component {

    componentWillMount() {
        browserHistory.listen(location => {
            this.props.setActiveNavigationButton(location.pathname);
        });
    }

    render() {
        return (
            <nav role="navigation" className="navbar navbar-default">
                <div className="collapse navbar-collapse row">
                    <ul className="nav navbar-nav col-sm-9 col-md-9 col-lg-9">
                        <NavigationButton mustHaveRoles={["ROLE_GUEST"]} to="/login" buttonText="Войти"/>
                        <NavigationButton mustHaveRoles={["SUPER_ADMIN"]} to="/clients" buttonText="Клиенты"/>
                        <NavigationButton mustHaveRoles={["SUPER_ADMIN"]} to="/client"
                                          buttonText="Редактировать клиента"/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK"]} to="/reports" buttonText="Отчеты"/>
                        <NavigationButton mustHaveRoles={["SUPER_ADMIN"]} to="/report/income"
                                          buttonText="Отчет о прибыли"/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK"]} to="/report/standard"
                                          buttonText="Стандартные отчеты"/>
                        <NavigationButton mustHaveRoles={["ADMIN"]} to="/stocks" buttonText="Склады"/>
                        <NavigationButton mustHaveRoles={["ADMIN"]} to="/stock" buttonText="Редактировать склад"/>
                        <NavigationButton mustHaveRoles={["ADMIN"]} to="/workers" buttonText="Сотрудники"/>
                        <NavigationButton mustHaveRoles={["ADMIN"]} to="/worker" buttonText="Редактировать сотрудника"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/carriers" buttonText="Перевозчики"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/carrier"
                                          buttonText="Редактировать перевозчика"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/drivers" buttonText="Водители"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/driver"
                                          buttonText="Редактировать водителя"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/waybills" buttonText="Накладные"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/waybill" buttonText="Создать накладную"/>
                        <NavigationButton mustHaveRoles={["MANAGER"]} to="/goods/receipt"
                                          buttonText="Поступление товара"/>
                        <NavigationButton mustHaveRoles={["MANAGER"]} to="/goods/distribution"
                                          buttonText="Распределение товара"/>
                        <NavigationButton mustHaveRoles={["MANAGER"]} to="/goods/departure" buttonText="Убытие товара"/>
                        <NavigationButton mustHaveRoles={["CONTROLLER"]} to="/goods/checkInput"
                                          buttonText="Проверка прибывших товаров"/>
                        <NavigationButton mustHaveRoles={["CONTROLLER"]} to="/goods/checkOutput"
                                          buttonText="Проверка выданных товаров"/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK", "CONTROLLER"]} to="/goods" buttonText="Товары"/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK"]} to="/acts" buttonText="Акты"/>
                        <NavigationButton mustHaveRoles={["CONTROLLER"]} to="/act" buttonText="Редактировать акт"/>
                    </ul>
                    <div className="userInfo col-sm-3 col-md-3 col-lg-3">
                        <UserInfo className="userInfo "/>
                    </div>

                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeNavigationButton: state.navigation.frontend.activeNavigationButton
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveNavigationButton: (refPath) => {
            dispatch(navigationActionCreator.setActiveNavigationButton(refPath))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
