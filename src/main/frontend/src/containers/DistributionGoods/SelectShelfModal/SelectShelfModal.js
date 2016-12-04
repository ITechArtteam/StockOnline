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
        //todo: change random to real shelfId
        this.props.addProductOnPlace(this.props.selectShelfModal.rowIndex, Math.floor(Math.random() * 1000));
        this.props.closeModal();
    }

    handleCancel() {
        this.props.closeModal();
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
                    <div className="btn-group pull-right">
                        <button type="button" className='btn btn-default' onClick={this.handleCancel}>Отмена</button>
                        <button type="button" className='btn btn-primary' onClick={this.handleSubmit}>Добавить</button>
                    </div>
                 </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectShelfModal: state.distributionGoodsReducer.selectShelfModal,
        waybill: state.distributionGoodsReducer.waybill
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch(distributionGoodsActionCreator.setShelfModalVisibility(false))
        },
        addProductOnPlace: (rowIndex, shelfId) => {
            dispatch(distributionGoodsActionCreator.addProductOnPlace(rowIndex, shelfId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectShelfModal);