import React from "react";
import {Row, Button, Col, Well} from "react-bootstrap";
import WorkerTable from "./WorkersTable";
import CleverModal from "../../views/CleverModal";
;

class Workers extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        workers: this.props.workers,
        buttonDisabled: true,
        selected: [],
        showDeleteModal: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({workers: nextProps.workers});
    }

    openDeleteModal = ()=> {
        this.setState({showDeleteModal: true});
    }

    closeDeleteModal = ()=> {
        this.setState({showDeleteModal: false});
    }

    onCreateClick = ()=> {
        this.props.onCreateClick();
    }

    onEditClick = () => {
        this.props.onEditClick(this.state.selected[0]);
        this.setState({selected: []});
    }

    onDeleteClick = ()=> {
        this.openDeleteModal()
    }

    deleteWorkers = ()=> {
        this.props.onDeleteClick(this.state.selected);
        this.setState({selected: []});
        this.closeDeleteModal();
    }

    onSelectAll = (selectedRowKeys) => {
        this.swithDisabledButton(selectedRowKeys);
        this.setState({selected: selectedRowKeys});
    }

    onRowSelect = (selectedRowKeys) => {
        this.swithDisabledButton(selectedRowKeys);
        this.setState({selected: selectedRowKeys});
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
                    <WorkerTable workers={this.state.workers} selected={this.state.selected} serch={this.state.serch}
                                 onSelectAll={this.onSelectAll} onRowSelect={this.onRowSelect}/>
                </Col>
                <CleverModal show={this.state.showDeleteModal}
                             title="Вы уверены, что хотите удалить выбранных работников?"
                             onOk={this.deleteWorkers } onClose={this.closeDeleteModal} onCancel={this.closeDeleteModal}/>
            </Row>
        )
    }
}

export default Workers;
