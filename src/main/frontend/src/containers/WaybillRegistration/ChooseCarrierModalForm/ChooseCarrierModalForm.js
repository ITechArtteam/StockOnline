import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'

import SelectInput from '../../../components/SelectInput/SelectInput'

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

class ChooseCarrierModalForm extends React.Component {

    handleSubmit() {
        this.props.onSave({name: 'testname'})
    }

    createCarriersOptions() {
        return this.props.carriers.reduce(function(options, carrier) {
            options.push({
                value: carrier.id,
                label: carrier.name
            });
            return options;
        }, []);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={() => {this.props.onHide()}}>
                <ModalHeader>
                    <ModalClose onClick={() => {this.props.onHide()}}/>
                    <ModalTitle>Выбор перевозчика</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <SelectInput
                        options={this.createCarriersOptions()}
                        value={this.props.carrierId}
                        onChange={this.props.selectCarrier} />
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={() => {this.props.onHide()}} value="Отмена" />
                    <input type="button" className='btn btn-primary' onClick={() => {this.handleSubmit()}} value="Выбрать" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        carriers: state.waybillRegistrationForm.carriers,
        carrierId: state.waybillRegistrationForm.selectedCarrierId
    }
}

export default connect(mapStateToProps, Actions)(ChooseCarrierModalForm);