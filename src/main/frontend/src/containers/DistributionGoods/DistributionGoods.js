import React from 'react'
import {distributionGoodsCreator} from "./index";
import {connect} from 'react-redux';

class DistributionGoods extends React.Component {
    render(){
        return (
            <div>DistributionGoods</div>
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
)(DistributionGoods);
