import React from "react";



class CleverPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        response: this.props.response,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({response: nextProps.response});
    }


    bsStyle = (status)=> {
        switch (status) {
            case "OK":
                return "alert alert-success";
            case "Bad Request":
                return "alert alert-danger";
        }
    }


    objToString = (obj) => {
        var rows = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var str = obj[p];
                rows.push(<li key={p}>{str}</li>)
            }
        }
        return rows;
    }

    handleAlertDismiss = () => {
        this.setState({response: null});
    }

    render() {
        if (this.state.response != null) {
            return (
                    <div className={this.bsStyle(this.state.response.statusText)}>
                        <strong>{this.state.response.headers.result}</strong>
                        <ul> {this.objToString(this.state.response.data)}</ul>
                    </div>
            );
        }
        return <div></div>
    }
}

export default CleverPanel;