import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';
import ClientTable from '../../components/ClientsTable/ClientsTable'

class Clients extends React.Component {
    componentWillMount() {
        this.props.getClientList(1, 10);
    }

    render() {
        return (
            <div className="row">
                <ClientTable clientList={this.props.clientList}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        clientList: state.clientListReducer.clientList
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
