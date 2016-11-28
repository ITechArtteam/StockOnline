import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'

import Select from 'react-select';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import SelectInput from '../../../components/SelectInput/SelectInput'

class ChooseSenderModalForm extends React.Component {

    componentWillMount() {
        this.props.loadSenders();
    }

    handleSubmit() {
        if (this.props.selectedSenderName !== '') {
            const senderName = this.props.selectedSenderName;
            const sender = this.props.senders.filter(function(sender) {
                return sender.name === senderName;
            })[0];
            this.props.setSender(sender);
            this.props.changeSenderName(sender.name);
            this.props.hideChooseSenderModal();
        }
    }

    handleCancel() {
        this.props.selectSender(null);
        this.props.hideChooseSenderModal();
    }

    createCarriersOptions() {
        return this.props.senders.reduce(function(options, sender) {
            options.push({
                value: sender.name,
                label: sender.name
            });
            return options;
        }, []);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={() => {this.handleCancel()}}>
                <ModalHeader>
                    <ModalClose onClick={() => {this.handleCancel()}}/>
                    <ModalTitle>Выбор отправителя</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <SelectInput
                        options={this.createCarriersOptions()}
                        value={this.props.selectedSenderName}
                        onChange={this.props.selectSender} />
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={() => {this.handleCancel()}} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSubmit()}} value="Выбрать" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedSenderName: state.waybillRegistrationForm.selectSenderModalForm.selectedSenderName,
    }
}

export default connect(mapStateToProps, Actions)(ChooseSenderModalForm);