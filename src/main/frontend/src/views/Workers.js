import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class Workers extends React.Component {


    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)"
        };
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
                <TableHeaderColumn dataField="id" hidden={true}>Имя</TableHeaderColumn>
                <TableHeaderColumn dataField="name" isKey={true}  dataSort={true}>Имя</TableHeaderColumn>
                <TableHeaderColumn dataField="surname" dataSort={true}>Фамилия</TableHeaderColumn>
                <TableHeaderColumn dataField="email" >Электронная почта</TableHeaderColumn>
                <TableHeaderColumn dataField="login" >Логин</TableHeaderColumn>
                <TableHeaderColumn dataField="roles" >Роли</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default Workers;
