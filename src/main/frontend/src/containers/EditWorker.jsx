import React from "react";
import {Button, FormGroup, Row, Col, Form, ControlLabel, FormControl} from 'react-bootstrap'
import Select from 'react-select'
import DateTimeField from 'react-bootstrap-datetimepicker'
class EditWorker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "1990-06-05",
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            options: [
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'}
            ]
        };
    }

    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({date: newDate});
    }


    logChange = (val) => {
        console.log("Selected: " + val);
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
                            <FormControl placeholder="Имя"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Фамилия
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Фамилия"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Отчество
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Отчество"/>
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
                            <FormControl type="email" placeholder="Электронная почта"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Страна
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Страна"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Город
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Город"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Дом
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Дом"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Квартира
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Квартира"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Роль
                        </Col>
                        <Col sm={10}>
                            <Select name="form-field-name"
                                    value="one"
                                    options={this.state.options}
                                    onChange={this.logChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Логин
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Логин"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Пароль
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Пароль"/>
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
