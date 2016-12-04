import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class WorkersTable extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        workers: this.props.workers,
        serch: this.props.serch,
        selected: this.props.selected,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({workers: nextProps.workers, serch: nextProps.serch, selected: nextProps.selected});
    }




    render() {
        const onRowSelect = ({id}, isSelected) => {
            var selected;
            console.log(this.state.selected)
            console.log(this.state.selected.filter(it => it !== id))
            if (isSelected) {
                selected = [...this.state.selected, id].sort();
            } else {
                selected = this.state.selected.filter(it => it !== id);
            }
            this.props.onRowSelect(selected);
            this.setState({selected: selected});
            return false;
        };

        const onSelectAll = (isSelected, rows) => {
            var selected = [];
            if (isSelected) {
                selected = _.map(rows, row=> {
                    return row.id;
                });
            }
            this.setState({selected: selected});
            this.props.onSelectAll(selected);
            return false;
        }

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: onRowSelect,
            onSelectAll: onSelectAll,
            selected: this.state.selected
        };

        function rolesFormatter(cell, row) {
            if (cell == null) return "";
            return cell.map(function (role) {
                return role.name;
            });
        }


        return (
            <BootstrapTable data={this.state.workers}
                            striped={true}
                            hover={true}
                            condensed={true}
                            pagination={true}
                            selectRow={selectRowProp}
                            ref="table"

            >
                <TableHeaderColumn dataField="id" hidden={true} isKey={true}>Имя</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>Имя</TableHeaderColumn>
                <TableHeaderColumn dataField="surname" dataSort={true}>Фамилия</TableHeaderColumn>
                <TableHeaderColumn dataField="email">Электронная почта</TableHeaderColumn>
                <TableHeaderColumn dataField="login">Логин</TableHeaderColumn>
                <TableHeaderColumn dataField="roles" dataFormat={rolesFormatter}>Роли</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default WorkersTable;
