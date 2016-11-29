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

class AddNumberModalForm extends React.Component {

    handleSaveNumber() {
        this.props.addNumber({
            number: this.props.number
        });
        this.props.hideAddNumberModalForm();
        this.props.changeBeingCreatedNumber('');
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
                        onChange={this.props.changeBeingCreatedNumber} />
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
        number: state.waybillRegistrationForm.transportNumbers.addNumberModalForm.number
    }
}

export default connect(mapStateToProps, Actions)(AddNumberModalForm);