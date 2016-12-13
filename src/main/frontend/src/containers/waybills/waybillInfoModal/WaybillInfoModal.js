import React from 'react';
import {waybillsActionCreator} from "../index";
import {connect} from 'react-redux';
import WaybillInfo from '../../../components/WaybillInfo/WaybillInfo'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'

class WaybillInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel() {
        this.props.closeModal();
    }

    dialogStyles = {
        base: {
            top: -600,
            transition: 'top 0.4s'
        },
        open: {
            width: "80%",
            top: 0
        }
    };

    render() {
        return (
            <Modal dialogStyles={this.dialogStyles} isOpen={this.props.waybillInfoModal.isVisible} onRequestHide={this.handleCancel}>
                <ModalHeader>
                    <ModalClose onClick={this.handleCancel}/>
                    <ModalTitle>Информация о накладной</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <WaybillInfo data={this.props.waybillInfoModal.waybill} visible={true}/>
                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        waybillInfoModal: state.waybillsReducer.waybillInfoModal,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => {
            dispatch(waybillsActionCreator.setWaybillInfoModalVisibility(false))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WaybillInfoModal);
