import React from "react";
import "./style.css";
import {Link} from "react-router";

class RegistrationOfGoods extends React.Component {
    render() {
        return (
            <div className="row">
                <div
                    className="well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                        <div className="panel-heading">Вид транспорта</div>
                        <div className="btn-group function-button-group choseButtonGroup" role="group">
                        <Link to="/registrationOfGoods/driver" className="btn btn-default">Автомобиль</Link>
                        <Link to="/registrationOfGoods/train" className="btn btn-default">Поезд</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationOfGoods;