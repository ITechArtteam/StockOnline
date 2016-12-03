import React from 'react'
import { connect } from 'react-redux'

import {distributionGoodsActionCreator} from "../index";

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

import SelectInput from '../../../components/SelectInput/SelectInput'

class SelectShelfModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.setSelectShelfModalVisibility(false);
    }

    handleCancel() {
        this.props.setSelectShelfModalVisibility(false);
    }

    render() {
        return (
            <Modal isOpen={this.props.selectShelfModal.isVisible} onRequestHide={this.handleCancel}>
                <ModalHeader>
                    <ModalClose onClick={this.handleCancel}/>
                    <ModalTitle>Выбор места хранения</ModalTitle>
                </ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <input type="button" className='btn btn-default' onClick={this.handleCancel} value="Отмена" />
                    <input type="button" className='btn btn-danger' onClick={this.handleCancel} value="Удалить" />
                    <input type="button" className='btn btn-primary' onClick={this.handleSubmit} value="Добавить" />
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectShelfModal: state.distributionGoodsReducer.selectShelfModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectShelfModalVisibility: visibility => {
            dispatch(distributionGoodsActionCreator.setShelfModalVisibility(visibility))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectShelfModal);