import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"

class Workers extends React.Component {


    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)"
        };
        function rolesFormatter(cell, row){
            if (cell==null) return "";
            return cell.map(function(role) {
                return role.name;
            });
        }
        return (
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
                <TableHeaderColumn dataField="name"   dataSort={true}>Имя</TableHeaderColumn>
                <TableHeaderColumn dataField="surname" dataSort={true}>Фамилия</TableHeaderColumn>
                <TableHeaderColumn dataField="email" >Электронная почта</TableHeaderColumn>
                <TableHeaderColumn dataField="login" >Логин</TableHeaderColumn>
                <TableHeaderColumn dataField="roles" dataFormat={rolesFormatter}>Роли</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default Workers;
