import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';
import ClientTable from '../../components/ClientsTable/ClientsTable'
import Pagination from "react-js-pagination";

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChanged = this.onPaginationChanged.bind(this);
    }
    componentWillMount() {
        this.props.getClientList(this.props.page.activePage, this.props.page.itemsCountPerPage);
    }

    onPaginationChanged(pageNumber) {
        this.props.getClientList(pageNumber, this.props.page.itemsCountPerPage)
    }

    render() {
        return (
            <div className="row">
                <ClientTable clientList={this.props.page.clientList}/>
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
                        onChange={() => this.props.getClientList(1, parseInt(this.refs.pageLimitSelect.value))}>
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
        page: state.clientListReducer.page
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClientList: (pageNumber, itemsCountPerPage) => {
            dispatch(clientListActionCreator.getClientList(pageNumber, itemsCountPerPage))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);
