import React from "react";
import {Grid, Button, FormGroup, Row, Col, Form, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";


class CleverAlert extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        message: this.props.message,
    }

    render() {
        if (this.state.message!=null) {
            return (
                <Alert bsStyle="danger">
                    {this.state.message}
                </Alert>
            );
        }
        return <div></div>    }
}

export default CleverAlert;