import React from 'react'
import WaybillInfo from "../../components/WaybillInfo/WaybillInfo"
import {connect} from 'react-redux';
import {checkOutputGoodsActionCreator} from './index'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import SimpleInput from '../../components/SimpleInput/SimpleInput'

class CheckOutputGoods extends React.Component {
    constructor(props) {
        super(props);
        this.onFindClick = this.onFindClick.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    onInputValueChange = e => {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setInputValue(nameField, value);
    };

    onFindClick() {
        this.props.findWaybillById(this.props.frontend.waybillId, 'Партия сформирована');
    };

    onClearClick() {
        this.props.setWaybillVisibility(false);
        this.props.setInputValue('waybillId', '');
    }

    onAcceptClick() {
        this.props.acceptWaybill(this.props.waybill.id, 'Выпуск разрешен', 'Выпуск разрешен');
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">
                        <SimpleInput id="waybillId"
                                     label="Номер накладной"
                                     value={this.props.frontend.waybillId}
                                     onChange={this.onInputValueChange}/>
                    </div>
                    <div className="col-xs-8">
                        <div className="before-table">
                            <label className="control-label">&nbsp;</label>
                            <div className="btn-group btn-group-justified">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default" onClick={this.onFindClick}>Поиск</button>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-danger" onClick={this.onClearClick}>Очистить поиск</button>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-success"
                                            disabled={this.props.frontend.waybillVisible ? "" : "disabled"}
                                            onClick={this.onAcceptClick}>Одобрить</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <WaybillInfo data={this.props.waybill} visible={this.props.frontend.waybillVisible}/>
                <AlertPopup close={this.props.closeDialog}
                            isVisible={this.props.alert.isVisible}
                            message={this.props.alert.text}
                            buttons={this.props.alert.buttons}
                            type={this.props.alert.type}/>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        waybill: state.checkOutputGoodsReducer.waybill,
        alert: state.checkOutputGoodsReducer.alert,
        frontend: state.checkOutputGoodsReducer.frontend
    }
};

const mapDispatchToProps = dispatch => {
    return {
        findWaybillById: (id, waybillStatus) => {
            dispatch(checkOutputGoodsActionCreator.findWaybillById(id, waybillStatus))
        },
        acceptWaybill: (id, waybillStatus, productStatus) => {
            dispatch(checkOutputGoodsActionCreator.acceptWaybill(id, waybillStatus, productStatus))
        },
        showDialog: (text, type, buttons) => {
            dispatch(checkOutputGoodsActionCreator.showDialog(text, type, buttons))
        },
        closeDialog: () => {
            dispatch(checkOutputGoodsActionCreator.closeDialog())
        },
        setInputValue: (nameField, value) => {
            dispatch(checkOutputGoodsActionCreator.setInputValue(nameField, value))
        },
        setWaybillVisibility: visibility => {
            dispatch(checkOutputGoodsActionCreator.setWaybillVisibility(visibility))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckOutputGoods);


