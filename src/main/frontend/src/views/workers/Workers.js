import React from "react";;
import linkState from "react-link-state";
import {Row, Button, FormGroup, Col, Form, ControlLabel, FormControl, Well} from "react-bootstrap";
import WorkerTable from "./WorkersTable";

class Workers extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        workers: this.props.workers,
        buttonDisabled: true,
        selected: [],
        serch:''
    }

    componentWillReceiveProps(nextProps) {
        this.setState({workers: nextProps.workers});
    }

    onCreateClick = ()=> {
        this.props.onCreateClick();
    }

    onEditClick = () => {
        this.props.onEditClick(this.state.selected[0]);
        this.setState({selected: []});
    }

    onDeleteClick = ()=> {
        this.props.onDeleteClick(this.state.selected);
        this.setState({selected: []});
    }

    onSelectAll = (selectedRowKeys) =>{
        this.swithDisabledButton(selectedRowKeys);
        this.setState({selected:selectedRowKeys});
    }

    onRowSelect = (selectedRowKeys) =>{
        this.swithDisabledButton(selectedRowKeys);
        this.setState({selected:selectedRowKeys});
    }

    swithDisabledButton = (selectedRowKeys)=> {
        if (selectedRowKeys.length == 0) {
            this.setState({buttonDisabled: true});
        } else {
            this.setState({buttonDisabled: false});
        }
    }


    render() {

        return (
            <Row>
                <Col xs={3}>
                    <Well bsSize="small">
                        <Button block={true} onClick={this.onCreateClick}>Создать</Button>
                        <Button block={true} onClick={this.onEditClick} disabled={this.state.buttonDisabled}>Редактировать</Button>
                        <Button block={true} onClick={this.onDeleteClick}
                                disabled={this.state.buttonDisabled}>Удалить</Button>
                    </Well>
                </Col>
                <Col xs={9}>
                    <WorkerTable workers={this.state.workers} selected={this.state.selected} serch={this.state.serch} onSelectAll={this.onSelectAll} onRowSelect={this.onRowSelect}/>
                </Col>
            </Row>
        )
    }
}

export default Workers;
