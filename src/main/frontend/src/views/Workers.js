import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Row} from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import CleverAlert from "./CleverAlert";

class Workers extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        message: this.props.message
    }


    render() {
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)"
        };

        function rolesFormatter(cell, row) {
            if (cell == null) return "";
            return cell.map(function (role) {
                return role.name;
            });
        }

        return (
            <div>
                <Row>
                    <CleverAlert message={this.state.message}/>
                </Row>
                <Row>
                    <BootstrapTable data={this.props.workers}
                                    striped={true}
                                    hover={true}
                                    condensed={true}
                                    pagination={true}
                                    selectRow={selectRowProp}
                                    deleteRow={true}
                                    columnFilter={true}
                                    search={true}>
                        <TableHeaderColumn dataField="id" hidden={true} isKey={true}>Имя</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Имя</TableHeaderColumn>
                        <TableHeaderColumn dataField="surname" dataSort={true}>Фамилия</TableHeaderColumn>
                        <TableHeaderColumn dataField="email">Электронная почта</TableHeaderColumn>
                        <TableHeaderColumn dataField="login">Логин</TableHeaderColumn>
                        <TableHeaderColumn dataField="roles" dataFormat={rolesFormatter}>Роли</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
            </div>

        )
    }
}

export default Workers;
