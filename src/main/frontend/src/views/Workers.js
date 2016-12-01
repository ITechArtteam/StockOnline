import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import linkState from "react-link-state";
import {Row, Button, FormGroup, Col, Form, ControlLabel, FormControl, Well} from "react-bootstrap";

class Workers extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        workers: this.props.workers,
        buttonDisabled: true,
        selected: [],
        serch: ''
    }

    componentWillReceiveProps(nextProps) {
        this.setState({workers: nextProps.workers});
    }

    onCreateClick = ()=> {
        this.props.onCreateClick();
    }

    onEditClick = () => {
        var selectedRowKeys = this.state.selected;
        this.props.onEditClick(selectedRowKeys[0]);
        this.setState({selected: []});
    }

    onDeleteClick = ()=> {
        var selectedRowKeys = this.state.selected;
        this.props.onDeleteClick(selectedRowKeys);
        this.setState({selected: []});
    }

    swithDisabledButton = (selectedRowKeys)=> {
        console.log(selectedRowKeys);
        if (selectedRowKeys.length == 0) {
            this.setState({buttonDisabled: true});
        } else {
            this.setState({buttonDisabled: false});
        }
    }

    getSerchWorker = ()=> {
        this.state.workers.filter(element => {
            return element.name.toLowerCase().includes(this.state.serch);
        });
    }

    render() {

        var filtrWorkers = this.state.workers,
            searchString = this.state.serch.trim().toLowerCase();


        if(searchString.length > 0){
            filtrWorkers = filtrWorkers.filter(element=>{element.name.toLowerCase().match( searchString )});
        }


        const onRowSelect = ({id}, isSelected) => {
            console.log(this.state.selected);
            var selected;
            if (isSelected) {
                selected = [...this.state.selected, id].sort();
                this.setState({
                    selected: selected
                });
            } else {
                selected = this.state.selected.filter(it => it !== id);
                this.setState({selected: selected});
            }
            this.swithDisabledButton(selected);
            return false;
        };

        const onSelectAll = (isSelected, rows) => {
            console.log(isSelected);
            console.log(rows);
            var selected = [];
            if (isSelected) {
                selected = _.map(rows, row=> {
                    return row.id;
                });
                this.setState({selected: selected});
            } else {
                this.setState({selected: selected});
            }
            this.swithDisabledButton(selected);
            return false;
        }

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: this.swithDisabledButton,
            onSelectAll: this.swithDisabledButton,
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
            <Row>
                <Col xs={3}>
                    <Well bsSize="small">
                        <Button block={true} onClick={this.onCreateClick}>Создать</Button>
                        <Button block={true} onClick={this.onEditClick} disabled={this.state.buttonDisabled}>Редактировать</Button>
                        <Button block={true} onClick={this.onDeleteClick}
                                disabled={this.state.buttonDisabled}>Удалить</Button>
                    </Well>
                    <Well bsSize="small">
                        <Form >
                            <FormGroup>
                                <ControlLabel>Поиск</ControlLabel>
                                <FormControl
                                    type="text"
                                    valueLink={linkState(this, 'serch')}
                                    placeholder="Поиск"
                                />
                            </FormGroup>
                        </Form>
                    </Well>
                    <Well bsSize="small">
                        <Form>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Записей на странице:</ControlLabel>
                                <FormControl componentClass="select">
                                    <option value="select">5</option>
                                    <option value="other">10</option>
                                </FormControl>
                            </FormGroup>
                        </Form>
                    </Well>
                </Col>
                <Col xs={9}>
                    <BootstrapTable data={filtrWorkers}
                                    striped={true}
                                    hover={true}
                                    condensed={true}
                                    pagination={true}
                                    selectRow={selectRowProp}
                                    columnFilter={true}
                                    search={true}
                                    ref="table"
                    >
                        <TableHeaderColumn dataField="id" hidden={true} isKey={true}>Имя</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Имя</TableHeaderColumn>
                        <TableHeaderColumn dataField="surname" dataSort={true}>Фамилия</TableHeaderColumn>
                        <TableHeaderColumn dataField="email">Электронная почта</TableHeaderColumn>
                        <TableHeaderColumn dataField="login">Логин</TableHeaderColumn>
                        <TableHeaderColumn dataField="roles" dataFormat={rolesFormatter}>Роли</TableHeaderColumn>
                    </BootstrapTable>
                </Col>
            </Row>
        )
    }
}

export default Workers;
