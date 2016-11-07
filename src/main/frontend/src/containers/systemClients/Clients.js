import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';
import ClientTable from '../../components/ClientsTable/ClientsTable'
import Pagination from '../../components/Pagination/Pagination'

// TODO 07.11.2016 add choosing record count limit
class Clients extends React.Component {
    componentWillMount() {
        this.props.getClientList(1, 10);
    }

    render() {
        return (
            <div className="row">
                <ClientTable clientList={this.props.clientList}/>
                <Pagination
                    currentPage={this.props.frontend.currentPage}
                    pageCount={this.props.frontend.pageCount}
                    limit={this.props.frontend.limit}
                    gotoPage={this.props.getClientList}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        clientList: state.clientListReducer.clientList,
        frontend: state.clientListReducer.frontend
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClientList: (pageNumber, recordsCount) => {
            dispatch(clientListActionCreator.getClientList(pageNumber, recordsCount))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);
