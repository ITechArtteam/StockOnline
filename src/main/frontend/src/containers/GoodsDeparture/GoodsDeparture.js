import React from "react";
import "./style.css";
import {Link} from "react-router";

class RegistrationOfGoods extends React.Component {
    render() {
        return (
            <div className="row">
                <div
                    className="well well-sm col-sm-5 col-md-5 col-lg-5 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                    <div className="btn-group function-button-group choseButtonGroup" role="group">
                        <Link to="/goods/departure/driver" className="btn btn-default">Автомобиль</Link>
                        <Link to="/goods/departure/train" className="btn btn-default">Поезд</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationOfGoods;