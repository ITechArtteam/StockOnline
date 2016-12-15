import React from "react";
import {Row} from "react-bootstrap";
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
                            <div className="row">
                                <span>Акт прикреплён</span>
                                <div className="pull-right">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button onClick={this.onChangeClick} className="btn btn-warning pull-right"
                                                type="button">Изменить
                                        </button>
                                        <button onClick={this.onDeleteClick} className="btn btn-danger pull-right"
                                                type="button">Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}


export default ActCard;
