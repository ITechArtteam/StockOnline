import React from 'react';
import {stockListActionCreator} from "./index";
import {connect} from 'react-redux';

class Stocks extends React.Component {
    componentWillMount() {
        this.props.getStockList(1, 5);
    }

    render() {
        // console.log(this.props.stockList);
        var stockListElements = this.props.stockList.map((item, index)=> {
                return <p key={index}>{item.name}</p>;
    });
        return (
            <div>Stock
        {stockListElements}
    </div>
    )
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        stockList: state.stockListReducer.stockList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
            getStockList: (pageNumber, recordsCount) => {
            dispatch(stockListActionCreator.getStockList(pageNumber, recordsCount))
}
}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stocks);