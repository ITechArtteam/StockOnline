import React from "react";;
import linkState from "react-link-state";
import {Row, Button, FormGroup, Col, Form, ControlLabel, FormControl, Well} from "react-bootstrap";
import ActsTable from "./ActsTable";

class Acts extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        acts: this.props.acts,
        buttonDisabled: true,
        selected: [],
    }

    componentWillReceiveProps(nextProps) {
        this.setState({acts: nextProps.acts, controllers: nextProps.controllers});
    }


    onShowClick = () => {
        this.props.onShowClick(this.state.selected[0]);
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
                        <Button block={true} onClick={this.onShowClick} disabled={this.state.buttonDisabled}>Посмотреть</Button>
                    </Well>
                </Col>
                <Col xs={9}>
                    <ActsTable acts={this.state.acts} selected={this.state.selected} serch={this.state.serch} onSelectAll={this.onSelectAll} onRowSelect={this.onRowSelect}/>
                </Col>
            </Row>
        )
    }
}

export default Acts;

