import React from 'react'
import WaybillInfo from "../../components/WaybillInfo/WaybillInfo"
import {connect} from 'react-redux';
import {checkOutputGoodsActionCreator} from './index'

class CheckOutputGoods extends React.Component {
    render(){
        return (
            <div>
                CheckOutputGoods
                <WaybillInfo/>
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckOutputGoods);


