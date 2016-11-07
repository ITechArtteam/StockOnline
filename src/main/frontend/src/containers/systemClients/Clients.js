import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';
import ClientTable from '../../components/ClientsTable/ClientsTable'
import Pagination from '../../components/Pagination/Pagination'

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
                Записей на странице:
                <select className="form-control"
                        ref={'pageLimitSelect'}
                        onChange={() => this.props.setPageLimit(parseInt(this.refs.pageLimitSelect.value))}>
                    <option>10</option>
                    <option>20</option>
                </select>
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
        },
        setPageLimit: limit => {
            dispatch(clientListActionCreator.setPageLimit(limit))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);
