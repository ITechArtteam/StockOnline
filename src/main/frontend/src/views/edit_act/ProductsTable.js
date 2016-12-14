import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Row, Button, Modal, Col, FormGroup, ControlLabel, HelpBlock, FormControl, Form, ButtonGroup} from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import $ from "jquery";
import validator from "validator";
import linkState from "react-link-state";
class ProductsTable extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);

    }

    state = {
        act_status: this.props.act_status,
        waybill_produts: [],
        selected: [],
        products_in_act: this.props.products_in_act,
        buttonDisabled: true,
        showModal: false,
        product_in_act: {
            id: "",
            product: {
                id: "",
                name: "",
                cost: "",
                unit: "",
                count: "",
            },
            status: "",
            cost: "",
            count: "",
        },
        validationsState: {
            product: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Продукт надо выбрать обязательно.",
            },
            count: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Количество требуеться задать обязательно.",
                rules: [{
                    rule: validator.isDecimal, message: "Количество должно обозначаться числом."
                }]
            },
            cost: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Сумму требуеться ввести обязательно.",
                rules: [{
                    rule: validator.isDecimal, message: "Сумма должно обозначаться числом."
                }]
            },
            status: {
                status: null,
                message: "",
                isRequred: true,
                requredMessage: "Статус требуеться выбрать обязательно.",
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            products_in_act: nextProps.products_in_act,
            act_status: nextProps.act_status
        });
        this.updateProps(nextProps);
    }

    componentWillMount() {
        this.updateProps(this.props);

    }

    updateProps = (props)=> {
        var newWaybill_produts = [];
        _.forEach(this.props.waybill_produts, (productInWaybill)=> {
            var newProductInAct = {};
            newProductInAct.id = productInWaybill.product.id;
            newProductInAct.name = productInWaybill.product.name;
            newProductInAct.count = productInWaybill.count;
            newProductInAct.unit = productInWaybill.product.unit;
            newProductInAct.cost = productInWaybill.product.cost;
            newWaybill_produts.push(newProductInAct);
        });
        this.setState({waybill_produts: newWaybill_produts});
    }

    swithDisabledButton = (selectedRowKeys)=> {
        if (selectedRowKeys.length == 0) {
            this.setState({buttonDisabled: true});
        } else {
            this.setState({buttonDisabled: false});
        }
    }

    onCreateClick = ()=> {
        this.onOpenModal();
    }

    onEditClick = () => {
        var index = _.findIndex(this.state.products_in_act, {'id': this.state.selected[0]});
        this.setState({product_in_act: this.state.products_in_act[index], selected: []});
        this.preliminaryValidation(this.state.products_in_act[index]);
        this.swithDisabledButton([]);
        this.onOpenModal();
    }

    preliminaryValidation = (productInAct) => {
        this.validateValue("product", productInAct.product);
        this.validateValue("count", productInAct.count);
        this.validateValue("cost", productInAct.cost);
        this.validateValue("status", productInAct.status);
    }

    onDeleteClick = ()=> {
        var newProducts_in_act = this.state.products_in_act;
        for (var id in this.state.selected) {
            newProducts_in_act = _.remove(newProducts_in_act, (product_in_act)=> {
                return product_in_act.id != this.state.selected[id];
            });
        }
        this.setState({products_in_act: newProducts_in_act, selected: []});
        this.props.onUpdate(newProducts_in_act);
    }

    onCloseModal = () => {
        var newProduct_in_act = _.extend({}, this.state.product_in_act);
        var newProduct = _.extend({}, this.state.product_in_act.product);
        newProduct_in_act.id = "";
        newProduct.id = "";
        newProduct.name = "";
        newProduct.count = "";
        newProduct.unit = "";
        newProduct.cost = "";
        newProduct_in_act.product = newProduct;
        newProduct_in_act.count = "";
        newProduct_in_act.cost = "";
        newProduct_in_act.status = "";
        var newValidationsState = _.extend({}, this.state.validationsState);
        newValidationsState.status.status = null;
        newValidationsState.status.message = null;
        newValidationsState.status.test = false;
        newValidationsState.count.status = null;
        newValidationsState.count.message = null;
        newValidationsState.count.test = false;
        newValidationsState.product.status = null;
        newValidationsState.product.message = null;
        newValidationsState.product.test = false;
        newValidationsState.cost.status = null;
        newValidationsState.cost.message = null;
        newValidationsState.cost.test = false;
        this.setState({showModal: false, product_in_act: newProduct_in_act, validationsState: newValidationsState});

    }

    onOpenModal = () => {
        this.setState({showModal: true});
    }

    onSave = () => {
        if (this.allValidate()) {
            var newProduct_in_act = _.extend({}, this.state.product_in_act);
            var newProducts_in_act = this.state.products_in_act;
            if ($.isNumeric(newProduct_in_act.id)) {
                var index = _.findIndex(this.state.products_in_act, {'id': newProduct_in_act.id});
                newProducts_in_act[index] = newProduct_in_act;
            } else {
                if (this.state.products_in_act.length == 0) {
                    newProduct_in_act.id = 0;
                } else {
                    newProduct_in_act.id = newProducts_in_act[newProducts_in_act.length - 1].id + 1;
                }
                newProducts_in_act = [...newProducts_in_act, newProduct_in_act];
            }
            this.setState({products_in_act: newProducts_in_act});
            this.onCloseModal();
            this.props.onUpdate(newProducts_in_act);
        }
    }

    onCalculateClick = () => {
        var newProduct_in_act = _.extend({}, this.state.product_in_act);
        newProduct_in_act.cost = newProduct_in_act.product.cost * newProduct_in_act.count;
        this.validateValue("cost", newProduct_in_act.cost);
        this.setState({product_in_act: newProduct_in_act});
    }

    validateValue = (id, value) => {
        this.validate(id, value);
    }

    validateComponent = (e) => {
        var id = e.target.id;
        var value = e.target.value;
        this.validate(id, value);
    }

    validate = (id, value) => {
        var newValidationsState = _.clone(this.state.validationsState);
        var validationState = newValidationsState[id];
        validationState.test = true;
        if (value == null) {
            value = "";
        }
        if ($.isNumeric(value)) {
            value = String(value);
        }
        if (value.length == 0 && validationState.isRequred) {
            validationState.status = 'error'
            validationState.message = validationState.requredMessage;
        } else {
            if (!(value.length == 0)) {
                var result = true;
                if (validationState.rules) {
                    for (var i = 0; i < validationState.rules.length; i++) {
                        result = result && validationState.rules[i].rule(value);
                        if (!result) {
                            validationState.status = 'error';
                            validationState.message = validationState.rules[i].message;
                            break;
                        }
                    }
                }
                if (validationState.warningRules) {

                    for (var i = 0; i < validationState.warningRules.length; i++) {
                        result = result && validationState.warningRules[i].rule(value);
                        if (!result) {
                            validationState.status = 'warning';
                            validationState.message = validationState.warningRules[i].message;
                            break;
                        }
                    }
                }
                if (result) {
                    if (validationState.isRequred) {
                        validationState.status = 'success'
                        validationState.message = "";
                    } else {
                        validationState.status = null
                        validationState.message = "";
                    }
                }
            }

        }
        this.setState({validationsState: newValidationsState});
    }

    clean = (e) => {
        var id = e.target.id;
        var newValidationsState = _.clone(this.state.validationsState);
        var validationState = newValidationsState[id];
        validationState.status = null
        validationState.message = "";
        this.setState({validationsState: newValidationsState});
    }

    cleanById(id) {
        var newValidationsState = _.clone(this.state.validationsState);
        var validationState = newValidationsState[id];
        validationState.status = null
        validationState.message = "";
        this.setState({validationsState: newValidationsState});
    }


    allValidate = () => {
        var result = true;
        var newValidationsState = _.clone(this.state.validationsState);
        for (var id in newValidationsState) {
            if (newValidationsState[id].test != true && newValidationsState[id].isRequred) {
                result = false;
                newValidationsState[id].status = 'error'
                newValidationsState[id].message = newValidationsState[id].requredMessage;
            } else {
                if ((newValidationsState[id].status != "success") && (newValidationsState[id].status != null)) {
                    result = false;
                }
            }
        }
        this.setState({validationsState: newValidationsState});
        return result;
    }


    render() {
        const onRowSelect = ({id}, isSelected) => {
            var selected;
            if (isSelected) {
                selected = [...this.state.selected, id].sort();
            } else {
                selected = this.state.selected.filter(it => it !== id);
            }
            this.setState({selected: selected});
            this.swithDisabledButton(selected);
            return false;
        };

        const onSelectAll = (isSelected, rows) => {
            var selected = [];
            if (isSelected) {
                selected = _.map(rows, row=> {
                    return row.id;
                });
            }
            this.setState({selected: selected});
            this.swithDisabledButton(selected);
            return false;
        }

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: onRowSelect,
            onSelectAll: onSelectAll,
            selected: this.state.selected
        };

        function productFormatter(cell, row) {
            return cell.name;
        }

        function countFormatter(cell, row) {
            return cell + " " + row.product.unit;
        }


        return (


            <div>
                <Row>
                    <ButtonGroup>
                        <Button bsStyle="primary" onClick={this.onCreateClick}>Создать</Button>
                        <Button bsStyle="warning" onClick={this.onEditClick} disabled={this.state.buttonDisabled}>Редактировать</Button>
                        <Button bsStyle="danger" onClick={this.onDeleteClick} disabled={this.state.buttonDisabled}>Удалить</Button>
                    </ButtonGroup>
                </Row>
                <Row>
                    <BootstrapTable data={this.state.products_in_act}
                                    striped={true}
                                    hover={true}
                                    condensed={true}
                                    pagination={true}
                                    selectRow={selectRowProp}
                                    ref="table"

                    >
                        <TableHeaderColumn dataField="id" hidden={true} isKey={true}>Идентификатор</TableHeaderColumn>
                        <TableHeaderColumn dataField="product" dataFormat={productFormatter}
                                           dataSort={true}>Продукт</TableHeaderColumn>
                        <TableHeaderColumn dataField="count" dataFormat={countFormatter}
                                           dataSort={true}>Количество</TableHeaderColumn>
                        <TableHeaderColumn dataField="cost" dataSort={true}>Стоимость</TableHeaderColumn>
                        <TableHeaderColumn dataField="status" dataSort={true}>Статус</TableHeaderColumn>
                    </BootstrapTable>
                </Row>

                <Modal show={this.state.showModal} onHide={this.onCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление продукта</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal id="worker_form">
                            <FormGroup validationState={this.state.validationsState.product.status}>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Продукт<span className="required-star">*</span>
                                </Col>
                                <Col sm={8}>
                                    <DropdownList
                                        valueField='id' textField='name'
                                        data={this.state.waybill_produts}
                                        value={this.state.product_in_act.product}
                                        onChange={selectProduct => {
                                            var newProduct_in_act = _.extend({}, this.state.product_in_act);
                                            newProduct_in_act.product = selectProduct;
                                            newProduct_in_act.count = newProduct_in_act.product.count;
                                            newProduct_in_act.cost = newProduct_in_act.product.cost * newProduct_in_act.product.count;
                                            this.validateValue("product", selectProduct);
                                            this.validateValue("count", newProduct_in_act.count);
                                            this.validateValue("cost", newProduct_in_act.cost);
                                            this.setState({product_in_act: newProduct_in_act});
                                        }}
                                        onToggle={()=> {
                                            this.cleanById("product")
                                        }}
                                    />
                                    <HelpBlock>{this.state.validationsState.product.message}</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Единицы<span className="required-star">*</span>
                                </Col>
                                <Col sm={8}>
                                    <FormControl readOnly placeholder="Единицы"
                                                 valueLink={linkState(this, 'product_in_act.product.unit')}/>
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.state.validationsState.count.status}>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Количество<span className="required-star">*</span>
                                </Col>
                                <Col sm={5}>
                                    <FormControl id="count" placeholder="Количество"
                                                 valueLink={linkState(this, 'product_in_act.count')}
                                                 onBlur={this.validateComponent}
                                                 onClick={this.clean}/>
                                    <HelpBlock>{this.state.validationsState.count.message}</HelpBlock>
                                </Col>
                                <Col sm={3}>
                                    <CalculateButton onClick={this.onCalculateClick}
                                                     product_in_act={this.state.product_in_act}
                                                     block={true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.state.validationsState.cost.status}>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Стоимость<span className="required-star">*</span>
                                </Col>
                                <Col sm={8}>
                                    <FormControl id="cost"
                                                 placeholder="Стоимость"
                                                 valueLink={linkState(this, 'product_in_act.cost')}
                                                 onBlur={this.validateComponent}
                                                 onClick={this.clean}/>
                                    <HelpBlock>{this.state.validationsState.cost.message}</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.state.validationsState.status.status}>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Статус<span className="required-star">*</span>
                                </Col>
                                <Col sm={8}>
                                    <DropdownList
                                        valueField='id' textField='name'
                                        data={this.state.act_status}
                                        value={this.state.product_in_act.status}
                                        onChange={selectStatus => {
                                            var newProductInAct = _.extend({}, this.state.product_in_act);
                                            newProductInAct.status = _.find(this.state.act_status, status => {
                                                return status == selectStatus;
                                            });
                                            this.validateValue("status", selectStatus);
                                            this.setState({product_in_act: newProductInAct});
                                        }}
                                        onToggle={()=> {
                                            this.cleanById("status")
                                        }}
                                    />
                                    <HelpBlock>{this.state.validationsState.status.message}</HelpBlock>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.onSave}>Сохранить</Button>
                        <Button onClick={this.onCloseModal}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

class CalculateButton extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        disabledCalculateButton: true
    }

    componentWillReceiveProps(nextProps) {
        if ($.isNumeric(nextProps.product_in_act.product.cost) && $.isNumeric(nextProps.product_in_act.count)) {
            this.setState({disabledCalculateButton: false});
        } else {
            this.setState({disabledCalculateButton: true});
        }
    }

    render() {
        return (
            <Button disabled={this.state.disabledCalculateButton}
                    onClick={this.props.onClick}>Рассчитать</Button>
        )
    }
}

export default ProductsTable;
