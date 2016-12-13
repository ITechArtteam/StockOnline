import React from "react";
import {Row, Button} from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
class ActCard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        act: this.props.act,
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
        this.setState({
            act: nextProps.act
        });
    }

    componentWillMount() {
        this.updateProps(this.props);
    }

    updateProps = (props) => {
    }


    onChangeClick = () => {
        this.props.onChangeClick();
    }

    onDeleteClick = () => {
        this.props.onDeleteClick();
    }


    render() {
        if (this.state.act.id === 1) {
            return (
                <div>
                    <Row className="show-grid">
                        <div className="alert alert-info">
                            Акт прикреплён
                            <Button onClick={this.onChangeClick}>Изменить</Button>
                            <Button onClick={this.onDeleteClick}>Удалить</Button>
                        </div>
                    </Row>
                </div>
            )
        }
        return (<div></div>)
    }
}


export default ActCard;
