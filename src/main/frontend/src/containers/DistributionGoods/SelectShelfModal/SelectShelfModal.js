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

    componentWillMount() {
        this.props.findStocksByUserCompany();
    }

    handleSubmit() {
        let stockValue = this.props.selectShelfModal.selectedStockValue;
        let roomValue = this.props.selectShelfModal.selectedRoomValue;
        let shelfValue = this.props.selectShelfModal.selectedShelfValue;
        if(stockValue === -1 || roomValue === -1 || shelfValue === -1) {
            return
        }
        let shelfObject = this.props.stocks[stockValue].rooms[roomValue].shelves[shelfValue];
        this.props.addProductOnPlace(this.props.selectShelfModal.rowIndex, shelfObject.id, shelfObject.number);
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
                    <SelectInput
                        options={this.props.stockOptions}
                        value={this.props.selectShelfModal.selectedStockValue}
                        onChange={this.props.selectStockValueChanged}
                        label="Склад"/>

                    <SelectInput
                        options={this.props.roomOptions}
                        value={this.props.selectShelfModal.selectedRoomValue}
                        onChange={this.props.selectRoomValueChanged}
                        label="Помещение"/>

                    <SelectInput
                        options={this.props.shelfOptions}
                        value={this.props.selectShelfModal.selectedShelfValue}
                        onChange={this.props.selectShelfValueChanged}
                        label="Место хранение"/>
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
        waybill: state.distributionGoodsReducer.waybill,
        stocks: state.distributionGoodsReducer.stocks,
        stockOptions: state.distributionGoodsReducer.stockOptions,
        roomOptions: state.distributionGoodsReducer.roomOptions,
        shelfOptions: state.distributionGoodsReducer.shelfOptions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch(distributionGoodsActionCreator.setShelfModalVisibility(false))
        },
        addProductOnPlace: (rowIndex, shelfId, number) => {
            dispatch(distributionGoodsActionCreator.addProductOnPlace(rowIndex, shelfId, number))
        },
        findStocksByUserCompany: () => {
            dispatch(distributionGoodsActionCreator.findStocksByUserCompany());
        },
        selectStockValueChanged: (stockValue) => {
            dispatch(distributionGoodsActionCreator.selectStockValueChanged(stockValue))
        },
        selectRoomValueChanged: (roomValue) => {
            dispatch(distributionGoodsActionCreator.selectRoomValueChanged(roomValue))
        },
        selectShelfValueChanged: (shelfValue) => {
            dispatch(distributionGoodsActionCreator.selectShelfValueChanged(shelfValue))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectShelfModal);