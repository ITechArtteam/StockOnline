import React from 'react'

import Select from 'react-select';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

class ChooseSenderModalForm extends React.Component {

    handleSubmit() {
        this.props.onSave({name: 'testname'})
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={() => {this.props.onHide()}}>
                <ModalHeader>
                    <ModalClose onClick={() => {this.props.onHide()}}/>
                    <ModalTitle>Выбор отправителя</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Select options={[
                                {
                                    value: 'one',
                                    label: 'labelone'
                                }
                            ]} value="one" />
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={() => {this.props.onHide()}} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSubmit()}} value="Выбрать" />
                </ModalFooter>
            </Modal>
        )
    }
}

export default ChooseSenderModalForm;