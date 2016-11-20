import React from 'react';
import {searchTransportCompanyForTrainActionCreator} from "./index";
import {connect} from 'react-redux';
import './style.css';
import {AlertPopup} from '../../components/AlertPopup';

class SearchTransportCompanyForTrain extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentWillUnmount(){

    }

    render() {
        return (
            <div className="row">

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClient: (clientName) => {
            dispatch(searchTransportCompanyForTrainActionCreator.getClient(clientName))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchTransportCompanyForTrain);
