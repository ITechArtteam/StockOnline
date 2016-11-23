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
    }

    onInputValueChange = e => {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setInputValue(nameField, value);
    };

    onFindClick() {
        this.props.findWaybillById(this.props.frontend.waybillId);
    };

    onAcceptClick() {
        this.props.acceptWaybill(this.props.frontend.waybillId);
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
                    <div className="col-xs-4">
                        <br/>
                        <div className="btn-group btn-group-justified before-table">
                            <div className="btn btn-default" onClick={this.onFindClick}>Поиск</div>
                            <div className="btn btn-success" onClick={this.onAcceptClick}>Одобрить</div>
                        </div>
                    </div>
                </div>
                <WaybillInfo data={this.props.waybill}/>
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
        findWaybillById: id => {
            dispatch(checkOutputGoodsActionCreator.findWaybillById(id))
        },
        acceptWaybill: id => {
            dispatch(checkOutputGoodsActionCreator.acceptWaybill(id))
        },
        showDialog: (text, type, buttons) => {
            dispatch(checkOutputGoodsActionCreator.showDialog(text, type, buttons))
        },
        closeDialog: () => {
            dispatch(checkOutputGoodsActionCreator.closeDialog())
        },
        setInputValue: (nameField, value) => {
            dispatch(checkOutputGoodsActionCreator.setInputValue(nameField, value))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckOutputGoods);


