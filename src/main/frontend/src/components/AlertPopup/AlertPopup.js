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
            var buttons = "";
            if (!!this.props.buttons)
                buttons = this.props.buttons.map((item, index) => {
                    return <button key={index} type="button" className={item.btnStyle} onClick={item.onclick}>{item.text}</button>
                });
            return (
                <div className={this.getStyles()}>
                    <span onClick={this.props.close} className="close">×</span>
                    <p className="message">{this.props.message}</p>
                    {buttons}
                </div>
        )
    }
}

AlertPopup.propTypes = {
    close: React.PropTypes.func.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
        btnStyle : React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        onclick: React.PropTypes.func.isRequired
    }))
};

export default AlertPopup;