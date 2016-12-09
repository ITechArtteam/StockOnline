import React from "react";
import WaybillInfo from "../../components/WaybillInfo/WaybillInfo";
import Acts from "../../views/acts/Acts";
import {connect} from "react-redux";
import {checkGoodsActionCreator} from "./index";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import SimpleInput from "../../components/SimpleInput/SimpleInput";
import {Row} from "react-bootstrap";
import * as actsApi from "../../api/acts-api";
import {browserHistory} from 'react-router';
class CheckGoods extends React.Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.onFindClick = this.onFindClick.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    componentWillMount() {
        //this.onClearClick();
    }

    onInputValueChange = e => {
        const nameField = e.target.id;
        const value = e.target.value;

        this.props.setInputValue(nameField, value);
    };

    onFindClick() {
        this.props.findWaybillByNumber(this.props.frontend.waybillId, this.props.expectedWaybillStatus);
    };

    onClearClick() {
        this.props.setWaybillVisibility(false);
        this.props.setInputValue('waybillId', '');
    }

    onAcceptClick() {
        this.props.acceptWaybill(this.props.waybill.number,
            this.props.finalWaybillStatus,
            this.props.finalProductStatus,
            this.props.senderRole);
    }

    onCreateClick = ()=> {
        this.redirect('/act');
    }

    onEditClick = (id) =>{
        this.redirect('/act/'+id);
    }

    onDeleteClick = (ids)=> {
        actsApi.deleteActs(ids)
    }

    redirect = (path) => {
        if (path != null) {
            browserHistory.push(path);
        }
    }

    render() {
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
                                    <button type="button" className="btn btn-default" onClick={this.onFindClick}>Поиск
                                    </button>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default" onClick={this.onClearClick}>
                                        Очистить поиск
                                    </button>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-success"
                                            disabled={this.props.frontend.waybillVisible ? "" : "disabled"}
                                            onClick={this.onAcceptClick}>{this.props.acceptButtonText}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <WaybillInfo data={this.props.waybill} visible={this.props.frontend.waybillVisible}/>
                <Row>
                    <Acts acts={this.props.acts}  onCreateClick={this.onCreateClick} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick}/>
                </Row>
                <AlertPopup close={this.props.closeDialog}
                            isVisible={this.props.alert.isVisible}
                            message={this.props.alert.text}
                            buttons={this.props.alert.buttons}
                            type={this.props.alert.type}/>
            </div>

        )
    }
}

CheckGoods.PropTypes = {
    expectedWaybillStatus: React.PropTypes.string.isRequired,
    finalWaybillStatus: React.PropTypes.string.isRequired,
    finalProductStatus: React.PropTypes.string.isRequired,
    acceptButtonText: React.PropTypes.string.isRequired,
    senderRole: React.PropTypes.string.isRequired,
};


const mapStateToProps = state => {
    return {
        waybill: state.checkGoodsReducer.waybill,
        alert: state.checkGoodsReducer.alert,
        frontend: state.checkGoodsReducer.frontend,
        acts: state.actsState.acts,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        findWaybillByNumber: (number, waybillStatus) => {
            dispatch(checkGoodsActionCreator.findWaybillByNumber(number, waybillStatus))
        },
        acceptWaybill: (number, waybillStatus, productStatus, senderRole) => {
            dispatch(checkGoodsActionCreator.acceptWaybill(number, waybillStatus, productStatus, senderRole))
        },
        showDialog: (text, type, buttons) => {
            dispatch(checkGoodsActionCreator.showDialog(text, type, buttons))
        },
        closeDialog: () => {
            dispatch(checkGoodsActionCreator.closeDialog())
        },
        setInputValue: (nameField, value) => {
            dispatch(checkGoodsActionCreator.setInputValue(nameField, value))
        },
        setWaybillVisibility: visibility => {
            dispatch(checkGoodsActionCreator.setWaybillVisibility(visibility))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckGoods);


