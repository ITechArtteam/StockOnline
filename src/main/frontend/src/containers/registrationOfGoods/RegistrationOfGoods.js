import React from 'react';
import './style.css';
import {Link} from "react-router";

class RegistrationOfGoods extends React.Component {
    render() {
        return (
            <div className="row">
                <Link to="/registrationOfGoods/driver">Автомобиль</Link>
                <Link to="/registrationOfGoods/train">Поезд</Link>
            </div>
        )
    }
}

export default RegistrationOfGoods;