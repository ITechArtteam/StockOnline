import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import SelectInput from '../../../components/SelectInput/SelectInput'

class ChooseCarrierModalForm extends React.Component {

    componentWillMount() {
        this.props.loadCarriers();
    }

    handleSubmit() {
        if (this.props.selectedCarrierName !== '') {
            const carrierName = this.props.selectedCarrierName;
            const carrier = this.props.carriers.filter(function(carrier) {
                return carrier.name === carrierName;
            })[0];
            this.props.setCarrier(carrier);
            this.props.changeCarrierName(carrier.name);
            this.props.hideChooseCarrierModalForm();
        }
    }

    handleCancel() {
        this.props.selectCarrier(null);
        this.props.hideChooseCarrierModalForm();
    }

    createCarriersOptions() {
        return this.props.carriers.reduce(function(options, carrier) {
            options.push({
                value: carrier.name,
                label: carrier.name
            });
            return options;
        }, []);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={() => {this.handleCancel()}}>
                <ModalHeader>
                    <ModalClose onClick={() => {this.handleCancel()}}/>
                    <ModalTitle>Выбор перевозчика</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <SelectInput
                        options={this.createCarriersOptions()}
                        value={this.props.selectedCarrierName}
                        onChange={this.props.selectCarrier} />
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
        selectedCarrierName: state.waybillRegistrationForm.selectCarrierModalForm.selectedCarrierName
    }
}

export default connect(mapStateToProps, Actions)(ChooseCarrierModalForm);