import React from 'react';
import {stockListActionCreator} from "./index";
import {connect} from 'react-redux';
import StockTable from '../../components/StocksTable/StocksTable'
import Pagination from "react-js-pagination";

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChanged = this.onPaginationChanged.bind(this);
    }
    componentWillMount() {
        this.props.getStockList(this.props.page.activePage, this.props.page.itemsCountPerPage);
    }

    onPaginationChanged(pageNumber) {
        this.props.getStockList(pageNumber, this.props.page.itemsCountPerPage)
    }

    render() {
        return (
            <div className="row">
            <StockTable stockList={this.props.page.stockList}/>
    <Pagination
        activePage={this.props.page.activePage}
        itemsCountPerPage={this.props.page.itemsCountPerPage}
        totalItemsCount={this.props.page.totalItemsCount}
        pageRangeDisplayed={5}
        onChange={this.onPaginationChanged}
    />
        Записей на странице:
            <select className="form-control"
        ref={'pageLimitSelect'}
        onChange={() => this.props.getStockList(1, parseInt(this.refs.pageLimitSelect.value))}>
    <option>5</option>
        <option>10</option>
        </select>
        </div>
    )
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        page: state.stockListReducer.page
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
            getStockList: (pageNumber, itemsCountPerPage) => {
            dispatch(stockListActionCreator.getStockList(pageNumber, itemsCountPerPage))
}
}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stocks);
