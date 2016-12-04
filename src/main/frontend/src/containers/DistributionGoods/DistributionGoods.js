import React from 'react'
import {distributionGoodsActionCreator} from "./index";
import {connect} from 'react-redux';
import SimpleInput from '../../components/SimpleInput/SimpleInput'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import WaybillInfo from "./WaybillInfo/WaybillInfo"

class DistributionGoods extends React.Component {
    constructor (props) {
        super(props);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.onFindClick = this.onFindClick.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    componentWillMount() {
        this.clearState();
    }

    onInputValueChange(e) {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setInputValue(nameField, value);
    };

    onFindClick() {
        this.props.findWaybillByNumber(this.props.frontend.waybillId);
    }

    clearState() {
        this.props.setWaybillVisibility(false);
        this.props.setInputValue('waybillId', '');
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-3">
                        <SimpleInput id="waybillId"
                                     label="Номер накладной"
                                     value={this.props.frontend.waybillId}
                                     onChange={this.onInputValueChange}/>
                    </div>
                    <div className="col-xs-1">
                        <label className="control-label">&nbsp;</label> <br/>
                        <button type="button" className="btn btn-default btn-block" onClick={this.onFindClick}>Поиск</button>
                    </div>
                </div>
                <AlertPopup close={this.props.closeDialog}
                            isVisible={this.props.alert.isVisible}
                            message={this.props.alert.text}
                            buttons={this.props.alert.buttons}
                            type={this.props.alert.type}/>
                <WaybillInfo visible={this.props.frontend.waybillVisible} data={this.props.waybill}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        frontend: state.distributionGoodsReducer.frontend,
        alert: state.distributionGoodsReducer.alert,
        waybill: state.distributionGoodsReducer.waybill
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setInputValue: (nameField, value) => {
            dispatch(distributionGoodsActionCreator.setInputValue(nameField, value))
        },
        findWaybillByNumber: (number) => {
            dispatch(distributionGoodsActionCreator.findWaybillByNumber(number, 'Проверка завершена'))
        },
        showDialog: (text, type, buttons) => {
            dispatch(distributionGoodsActionCreator.showDialog(text, type, buttons))
        },
        closeDialog: () => {
            dispatch(distributionGoodsActionCreator.closeDialog())
        },
        setWaybillVisibility: visibility => {
            dispatch(distributionGoodsActionCreator.setWaybillVisibility(visibility))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributionGoods);
