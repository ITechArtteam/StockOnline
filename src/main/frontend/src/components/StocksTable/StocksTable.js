import React from 'react'
import {Link} from 'react-router'

class StocksTable extends React.Component {
    render() {
        var stockListRows = this.props.stockList.map((item, index) => {
                var labelType = item.active ? "label-success" : "label-danger";
        var labelText = item.active ? "Активна" : 'Приостановлена';
        return (
            <tr key={index}>
                <td>
                    <div className="checkbox">
                    <label>
                        <input type="checkbox" id={'chbox' + index} defaultValue={item.id}/>
                    </label>
                    </div>
                </td>
                <td>
                    <Link to={"/stock/" + item.id}>{item.id}</Link>
                </td>
                <td>
                    {item.country}, {'г. ' + item.city}, {'ул. ' + item.street},{'д. ' + item.home},{'кв. ' + item.room}
                </td>
                <td>
                    {item.nameCompany}
                </td>
            </tr>
    )
    });
        return (
            <table className="table table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Номер склада</th>
                    <th>Адрес</th>
                    <th>Компания</th>
                </tr>
            </thead>
            <tbody>{stockListRows}</tbody>
        </table>
    )
    }
}

StocksTable.propTypes = {
    stockList: React.PropTypes.array.isRequired
};

export default StocksTable;

