import React from "react";
import {Modal, Button} from "react-bootstrap";

class CleverModal extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        title: this.props.title,
        text: this.props.text,
        onOk: this.props.onOk,
        onCancel: this.props.onCancel,
        onClose: this.props.onClose,
        show: this.props.show
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            text: nextProps.text,
            onOk: nextProps.onOk,
            onCancel: nextProps.onCancel,
            onClose: nextProps.onClose,
            show: nextProps.show
        });
    }


    fromArrayToString = (text_array) => {
        var rows = [];
        if (text_array) {
            for (var i = 0; i < text_array.length; i++) {
                rows.push(<li key={i}>{text_array[i]}</li>);
            }
        }
        return rows;
    }

    onClose = () => {
        this.state.onClose();
        this.close();
    }

    onOk = () => {
        this.state.onOk();
        this.close();
    }

    onCancel = () => {
        this.state.onCancel();
        this.close();
    }

    close = ()=> {
        this.setState({show: false});
    }


    render() {
        return (
            <Modal show={this.state.show} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                {this.fromArrayToString(this.state.text)}
                <Modal.Footer>
                    <Button onClick={this.onCancel}>Отмена</Button>
                    <Button onClick={this.onOk} bsStyle="primary">Ок</Button>
                </Modal.Footer>
            </Modal>
        );

    }

}

export default CleverModal;