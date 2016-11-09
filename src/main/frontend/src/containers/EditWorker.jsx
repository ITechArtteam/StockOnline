import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel} from 'react-bootstrap'
import {DateTimeField} from 'react-bootstrap-datetimepicker'
class EditWorker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "1990-06-05",
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date"
        };
    }

    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({date: newDate});
    }


    render() {
        const {date, format, mode, inputFormat} = this.state;
        return (
            <Row className="show-grid">
                <Form horizontal id="worker_form">
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Имя
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Имя"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Фамилия
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Фамилия"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Отчество
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Отчество"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Дата рождения
                        </Col>
                        <Col sm={10}>
                            <DateTimeField
                                dateTime={date}
                                format={format}
                                viewMode={mode}
                                inputFormat={inputFormat}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Электронная почта
                        </Col>
                        <Col sm={10}>
                            <FormContol type="email" placeholder="Электронная почта"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Страна
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Страна"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Город
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Город"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Дом
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Дом"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Квартира
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Квартира"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Роль
                        </Col>
                        <Col sm={10}>

                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Логин
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Логин"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Пароль
                        </Col>
                        <Col sm={10}>
                            <FormContol placeholder="Пароль"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <div className="btn-group" role="group">
                                <Button type="submit" bsStyle="primary">Сохранить</Button>
                                <Button>Сохранить</Button>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </Row>
        )
    }
}

export default EditWorker;
