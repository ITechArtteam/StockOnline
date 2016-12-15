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


    bsStyle = (type)=> {
        switch (type) {
            case "success":
                return "alert alert-success";
            case "danger":
                return "alert alert-danger";
            default:
                return "alert alert-danger";
        }
    }


    fromArrayToString = (text_array) => {
        var rows = [];
        if (text_array) {
            for (var i = 0; i < text_array.length; i++) {
                rows.push(<li key={i}>{text_array[i]}</li>);
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
                <div className={this.bsStyle(this.state.response.type)} role="alert">
                    <button onClick={this.state.response.onClose} type="button" className="close" data-dismiss="alert"
                            aria-label="Close"><span aria-hidden="true">×</span></button>
                    <strong>{this.state.response.title}</strong>
                    <ul> {this.fromArrayToString(this.state.response.text)}</ul>
                    <br/>
                </div>
            );
        }
        return (<div></div>);
    }

}

export default CleverPanel;