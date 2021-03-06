import React from "react";
import WaybillInfo from "../../components/WaybillInfo/WaybillInfo";
import ActCard from "../../views/edit_act/ActCard";
import CleverModal from "../../views/CleverModal";
import {connect} from "react-redux";
import {checkGoodsActionCreator} from "./index";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import SimpleInput from "../../components/SimpleInput/SimpleInput";
import * as actApi from "../../api/act-api";
import {browserHistory} from "react-router";
import * as checkGoodsApi from "../../api/check_goods-api";
class CheckGoods extends React.Component {
    constructor(props) {
        super(props);
        this.onFindClick = this.onFindClick.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    state = {
        act: this.props.act,
        showCreateModal: false,
        showDeleteModal: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            act: nextProps.act,
        });
    }


    componentWillMount() {
        console.log(this.props.expectedWaybillStatus)
        console.log(this.props.waybill.status)
        if (!(this.props.expectedWaybillStatus==this.props.waybill.status)){
            checkGoodsApi.clearReducer();
            actApi.clearReducer();
        }
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
            this.props.senderRole,
            this.state.act);
    }

    onChangeClick = () => {
        this.redirect('/act');
    }

    onDeleteClick = () => {
        this.openDeleteModal();
    }

    onDeleteAct = () =>{
        actApi.clearReducer();
        this.closeDeleteModal();
    }


    onMakeActClick = () => {
        if (this.state.act.id) {
            this.setState({showCreateModal: true});
        } else {
            this.makeAct();
        }
    }

    makeAct = () => {
        actApi.clearReducer();
        this.redirect('/act');
        this.closeCreateModal()
    }

    closeCreateModal = ()=> {
        this.setState({showCreateModal: false});
    }

    openDeleteModal = ()=> {
        this.setState({showDeleteModal: true});
    }

    closeDeleteModal = ()=> {
        this.setState({showDeleteModal: false});
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
                                <div className={this.props.senderRole === 'controller' ? "btn-group" : "none"}>
                                    <button type="button" className="btn btn-info"
                                            disabled={this.props.frontend.waybillVisible ? "" : "disabled"}
                                            onClick={this.onMakeActClick}>Создать акт
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
                <ActCard act={this.state.act} onChangeClick={this.onChangeClick} onDeleteClick={this.onDeleteClick}/>
                <WaybillInfo data={this.props.waybill} visible={this.props.frontend.waybillVisible}/>
                <AlertPopup close={this.props.closeDialog}
                            isVisible={this.props.alert.isVisible}
                            message={this.props.alert.text}
                            buttons={this.props.alert.buttons}
                            type={this.props.alert.type}/>
                <CleverModal show={this.state.showCreateModal} title="Вы уверены, что хотите перезаписать акт?"
                             onOk={this.makeAct} onClose={this.closeCreateModal} onCancel={this.closeCreateModal}/>
                <CleverModal show={this.state.showDeleteModal} title="Вы уверены, что хотите удалить акт?"
                             onOk={this.onDeleteAct} onClose={this.closeDeleteModal} onCancel={this.closeDeleteModal}/>

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
        act: state.actState.act
    }
};

const mapDispatchToProps = dispatch => {
    return {
        findWaybillByNumber: (number, waybillStatus) => {
            dispatch(checkGoodsActionCreator.findWaybillByNumber(number, waybillStatus))
        },
        acceptWaybill: (number, waybillStatus, productStatus, senderRole, act) => {
            dispatch(checkGoodsActionCreator.acceptWaybill(number, waybillStatus, productStatus, senderRole, act))
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


