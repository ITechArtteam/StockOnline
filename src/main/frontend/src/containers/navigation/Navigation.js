import React from "react";
import {connect} from "react-redux";
import "./navigation.css";
import UserInfo from "../../containers/UserInfo";
import NavigationButton from "./NavigationButton";
import LogoutButton from "./LogoutButton";
import {navigationActionCreator} from "./index";
import {browserHistory} from "react-router";
import * as checkGoodsApi from "../../api/check_goods-api";
import * as actApi from "../../api/act-api";
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
                    <ul className="nav navbar-nav col-sm-8 col-md-8 col-lg-8">
                        <NavigationButton mustHaveRoles={["ROLE_GUEST"]} to="/login" buttonText="Войти"/>
                        <NavigationButton mustHaveRoles={["SUPER_ADMIN"]} to="/clients" buttonText="Клиенты"/>
                        {/*<NavigationButton mustHaveRoles={["BOSS_STOCK"]} to="/reports" buttonText="Отчеты"/>
                        <NavigationButton mustHaveRoles={["SUPER_ADMIN"]} to="/report/income"
                                          buttonText="Отчет о прибыли"/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK"]} to="/report/standard"
                                          buttonText="Стандартные отчеты"/>*/}
                        <NavigationButton mustHaveRoles={["ADMIN"]} to="/stocks" buttonText="Склады"/>
                        <NavigationButton mustHaveRoles={["ADMIN"]} to="/workers" buttonText="Сотрудники"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/registrationOfGoods" buttonText="Регистрация товаров"/>
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/waybills" buttonText="Зарегистрированные накладные" />
                        <NavigationButton mustHaveRoles={["DISPATCHER"]} to="/finishOutput" buttonText="Разрешения выпуска товаров" onClick={()=> {
                            checkGoodsApi.clearReducer();
                            actApi.clearReducer();
                        }}/>
                        <NavigationButton mustHaveRoles={["MANAGER"]} to="/goods/distribution"
                                          buttonText="Распределение товара"/>
                        <NavigationButton mustHaveRoles={["MANAGER"]} to="/manager/waybills" buttonText="Выданные накладные" />

                        <NavigationButton mustHaveRoles={["MANAGER"]} to="/goods/departure" buttonText="Убытие товара"/>
                        <NavigationButton mustHaveRoles={["CONTROLLER"]} to="/goods/checkInput"
                                          buttonText="Проверка прибывших товаров" onClick={()=> {
                            checkGoodsApi.clearReducer();
                            actApi.clearReducer();
                        }}/>
                        <NavigationButton mustHaveRoles={["CONTROLLER"]} to="/goods/checkOutput"
                                          buttonText="Проверка выданных товаров" onClick={()=> {
                            checkGoodsApi.clearReducer();
                            actApi.clearReducer();
                        }}/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK", "CONTROLLER"]} to="/goods" buttonText="Товары"/>
                        <NavigationButton mustHaveRoles={["BOSS_STOCK"]} to="/acts" buttonText="Акты"/>
                    </ul>
                    <div className="userInfo col-sm-3 col-md-3 col-lg-3">
                        <UserInfo className="userInfo "/>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1">
                        <LogoutButton/>
                    </div>

                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
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
