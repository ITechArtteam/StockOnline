import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../../actions'

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import TextInput from '../../../../../components/TextInput/TextInput'

import {
    checkNumber
} from './validation'

class AddNumberModalForm extends React.Component {

    handleSaveNumber() {
        const errors = this.validateForm();
        if (errors.length < 1) {
            this.props.addNumber({
                number: this.props.number
            });
            this.props.hideAddNumberModalForm();
            this.props.changeBeingCreatedNumber('');
        }
    }

    validateForm() {
        let errors = [];
        let error;

        if ((error = this.validateNumber()) != '') {
            errors.push(error);
        }

        return errors;
    }

    validateNumber() {
        const error = checkNumber(this.props.number, this.props.numbers);
        this.props.setTransportNumberError(error);
        return error;
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideAddNumberModalForm}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideAddNumberModalForm}/>
                    <ModalTitle>Добавить номер</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <TextInput
                        label="Номер"
                        value={this.props.number}
                        error={this.props.numberError}
                        onChange={this.props.changeBeingCreatedNumber}
                        onBlur={() => {this.props.setTransportNumberError(checkNumber(this.props.number, this.props.numbers))}}/>
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.props.hideAddNumberModalForm} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSaveNumber()}} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.waybillRegistrationForm.transportNumbers.addNumberModalForm.isOpen,
        number: state.waybillRegistrationForm.transportNumbers.addNumberModalForm.number,
        numberError: state.waybillRegistrationForm.transportNumbers.addNumberModalForm.validationError,
        numbers: state.waybillRegistrationForm.transportNumbers.numbers
    }
}

export default connect(mapStateToProps, Actions)(AddNumberModalForm);