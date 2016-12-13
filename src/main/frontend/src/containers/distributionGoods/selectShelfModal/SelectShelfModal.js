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
import SimpleInput from '../../../components/SimpleInput/SimpleInput'
import DisabledInput from '../../../components/DisabledInput/DisabledInput'

class SelectShelfModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateOnChange = this.validateOnChange.bind(this);
    }

    handleSubmit() {
        if(this.props.inputErrors.itemCount.length !== 0 || this.props.frontend.itemCount.length === 0) {
            return;
        }
        let stockValue = this.props.selectShelfModal.selectedStockValue;
        let roomValue = this.props.selectShelfModal.selectedRoomValue;
        let shelfValue = this.props.selectShelfModal.selectedShelfValue;
        if(stockValue === -1 || roomValue === -1 || shelfValue === -1) {
            return
        }
        let shelfObject = this.props.stocks[stockValue].rooms[roomValue].shelves[shelfValue];
        //todo pass whole object
        console.log("wholeObject ", shelfObject);
        this.props.addProductOnPlace(this.props.selectShelfModal.rowIndex,
            {
                shelfId: shelfObject.id,
                number: shelfObject.number,
                count: Number.parseInt(this.props.frontend.itemCount)
            });
        this.props.closeModal();
    }

    validateOnChange(e) {
        const nameField = e.target.id;
        const value = e.target.value;
        this.props.setInputError(nameField, "");
        if (!new RegExp("^[0-9]*$", "iu").test(value)) {
            this.props.setInputError(nameField, "Только числа");
        }
        let num = Number.parseInt(value);
        let freeCount = this.props.stocks[this.props.selectShelfModal.selectedStockValue]
            .rooms[this.props.selectShelfModal.selectedRoomValue]
            .shelves[this.props.selectShelfModal.selectedShelfValue].freeCount;
        let needToPlace = this.props.waybill.productInWaybills[this.props.selectShelfModal.rowIndex].count - this.props.waybill.productInWaybills[this.props.selectShelfModal.rowIndex].placedCount;

        needToPlace = Math.min(freeCount, needToPlace);

        if(num > needToPlace) {
            this.props.setInputError(nameField, `Число не более ${needToPlace}`);
        }
        this.props.setInputValue(nameField, value);
    }

    onInputValueChange(e) {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setInputValue(nameField, value);
    };

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
                    <span className={this.props.selectShelfModal.isStockSelected ? "none" : ""}>
                        <SelectInput
                            options={this.props.stockOptions}
                            value={this.props.selectShelfModal.selectedStockValue}
                            onChange={this.props.selectStockValueChanged}
                            label="Склад"/>
                    </span>

                    <span className={this.props.selectShelfModal.isStockSelected ? "" : "none"}>
                        <DisabledInput
                            label="Склад"
                            value={this.props.stockOptions[this.props.selectShelfModal.selectedStockValue > 0 ? this.props.selectShelfModal.selectedStockValue : 0].label} />

                        <SelectInput
                            options={this.props.roomOptions}
                            value={this.props.selectShelfModal.selectedRoomValue}
                            onChange={this.props.selectRoomValueChanged}
                            label="Помещение"/>

                        <div className="row">
                            <div className="col-xs-8">
                                <SelectInput
                                    options={this.props.shelfOptions}
                                    value={this.props.selectShelfModal.selectedShelfValue}
                                    onChange={this.props.selectShelfValueChanged}
                                    label="Место хранение"/>
                            </div>
                            <div className="col-xs-4">
                                <SimpleInput onChange={this.validateOnChange}
                                             label="Количество"
                                             id="itemCount"
                                             value={this.props.frontend.itemCount}
                                             errorValue={this.props.inputErrors.itemCount}/>
                            </div>
                        </div>
                    </span>
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
        inputErrors: state.distributionGoodsReducer.inputErrors,
        frontend: state.distributionGoodsReducer.frontend,
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
        setInputValue: (nameField, value) => {
            dispatch(distributionGoodsActionCreator.setInputValue(nameField, value))
        },
        setInputError: (nameField, value) => {
            dispatch(distributionGoodsActionCreator.setInputError(nameField, value))
        },
        closeModal: () => {
            dispatch(distributionGoodsActionCreator.setShelfModalVisibility(false))
        },
        addProductOnPlace: (rowIndex, info) => {
            dispatch(distributionGoodsActionCreator.addProductOnPlace(rowIndex, info))
        },
        selectStockValueChanged: (stockValue) => {
            dispatch(distributionGoodsActionCreator.setIsStockSelected(true));
            dispatch(distributionGoodsActionCreator.selectStockValueChanged(stockValue))
        },
        selectRoomValueChanged: (roomValue) => {
            dispatch(distributionGoodsActionCreator.selectRoomValueChanged(roomValue))
        },
        selectShelfValueChanged: (shelfValue) => {
            dispatch(distributionGoodsActionCreator.selectShelfValueChanged(shelfValue))
        },
        closeDialog: () => {
            dispatch(distributionGoodsActionCreator.closeDialog());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectShelfModal);