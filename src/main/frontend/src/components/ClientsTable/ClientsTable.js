import React from 'react'
import {Link} from 'react-router'

class ClientsTable extends React.Component {
    render() {
        var clientListRows = this.props.clientList.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id={'chbox' + index} defaultValue={item.name}/>
                            </label>
                        </div>
                    </td>
                    <td>
                        <Link to={"/client/" + item.name}>{item.name}</Link>
                    </td>
                    <td>
                        {item.country}, {'г. ' + item.city}, {'ул. ' + item.street},{'д. ' + item.home},{'кв. ' + item.room}
                    </td>
                </tr>
            )
        });
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th></th>
                    <th>Название компании</th>
                    <th>Адрес</th>
                </tr></thead>
                <tbody>{clientListRows}</tbody>
            </table>
        )
    }
}

ClientsTable.propTypes = {
    clientList: React.PropTypes.array.isRequired
};

export default ClientsTable;

