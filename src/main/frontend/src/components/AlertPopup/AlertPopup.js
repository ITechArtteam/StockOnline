import React from 'react'
import './style.css';

class AlertPopup extends React.Component {
    constructor(props){
        super(props);
        this.getStyles = this.getStyles.bind(this);
    }

    getStyles(){
        if (this.props.isVisible) {
            let style = "alert";
            switch(this.props.type){
                case "danger":
                    style += " alert-danger";
                    break;
                default:
                    style += " alert-success";
                    break;
            }
            return style;
        } else {
            return "none";
        }

    }

    render() {
        return (
            <div className={this.getStyles()}>
                <span onClick={this.props.close} className="close">×</span>
                <p className="message">{this.props.message}</p>
            </div>
        )
    }
}

AlertPopup.propTypes = {
    close: React.PropTypes.func.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string
};

export default AlertPopup;