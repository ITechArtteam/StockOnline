import React from 'react';
import {clientListActionCreator} from "./index";
import {connect} from 'react-redux';

class Clients extends React.Component {
    componentWillMount() {
        this.props.getClientList(1, 10);
    }

    render() {
        // console.log(this.props.clientList);
        var clientListElements = this.props.clientList.map((item, index)=> {
            return <p key={index}>{item.name}</p>;
        });
        return (
            <div>Client
                {clientListElements}
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
