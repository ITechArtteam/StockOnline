import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Row, Button, Modal, Col, FormGroup, ControlLabel, HelpBlock, FormControl, Form} from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import _ from "lodash";
import $ from "jquery";
import linkState from "react-link-state";
class ProductsTable extends React.Component {

    constructor(props) {
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
            status:"",
            cost: "",
            count: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            waybill_produts: nextProps.waybill_produts,
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
        _.forEach(this.props.waybill_produts, (product)=> {
            var newProduct = {};
            newProduct.id = newWaybill_produts.length;
            newProduct.name = product.product.name;
            newProduct.count = product.count;
            newProduct.unit = product.product.unit;
            newProduct.cost = "";
            newWaybill_produts.push(newProduct);
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
        this.swithDisabledButton([]);
        this.onOpenModal();
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
        this.setState({showModal: false, product_in_act: newProduct_in_act});
    }

    onOpenModal = () => {
        this.setState({showModal: true});
    }

    onSave = () => {
        var newProduct_in_act = _.extend({}, this.state.product_in_act);
        var newProducts_in_act = this.state.products_in_act;
        if ($.isNumeric(newProduct_in_act.id)) {
            var index = _.findIndex(this.state.products_in_act, {'id': newProduct_in_act.id});
            newProducts_in_act[index] = newProduct_in_act;
        } else {
            console.log(this.state.products_in_act.length)
            if (this.state.products_in_act.length==0){
                newProduct_in_act.id = 0;
            } else{
                newProduct_in_act.id = newProducts_in_act[newProducts_in_act.length-1].id+1;
            }
            newProducts_in_act = [...newProducts_in_act, newProduct_in_act];
        }
        console.log(newProducts_in_act)
        this.setState({products_in_act: newProducts_in_act});
        this.onCloseModal();
        this.props.onUpdate(newProducts_in_act);
    }

    onCalculateClick = () => {
        var newProduct_in_act = _.extend({}, this.product_in_act);
        Product_in_act.cost = this.state.product_in_act.product_cost * this.state.product_in_act.count;
        this.setState({act: newAct});
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
                    <Button onClick={this.onCreateClick}>Создать</Button>
                    <Button onClick={this.onEditClick} disabled={this.state.buttonDisabled}>Редактировать</Button>
                    <Button onClick={this.onDeleteClick} disabled={this.state.buttonDisabled}>Удалить</Button>
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
                            <FormGroup>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Продукт
                                </Col>
                                <Col sm={8}>
                                    <DropdownList
                                        valueField='id' textField='name'
                                        data={this.state.waybill_produts}
                                        value={this.state.product_in_act.product.id}
                                        onChange={selectProduct => {
                                            var newProduct_in_act = _.extend({}, this.state.product_in_act);
                                            newProduct_in_act.product = selectProduct;
                                            newProduct_in_act.count = newProduct_in_act.product.count;
                                            newProduct_in_act.cost = newProduct_in_act.product.cost * newProduct_in_act.product.count;
                                            this.setState({product_in_act: newProduct_in_act});
                                        }}/>
                                    <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Единицы
                                </Col>
                                <Col sm={8}>
                                    <FormControl readOnly placeholder="Единицы"
                                                 valueLink={linkState(this, 'product_in_act.product.unit')}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Количество
                                </Col>
                                <Col sm={5}>
                                    <FormControl placeholder="Количество"
                                                 valueLink={linkState(this, 'product_in_act.count')} type="number"/>
                                    <FormControl.Feedback />
                                    <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                                </Col>
                                <Col sm={3}>
                                    <CalculateButton onClick={this.onCalculateClick}
                                                     product_in_act={this.state.product_in_act}
                                                     block={true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Стоимость
                                </Col>
                                <Col sm={8}>
                                    <FormControl placeholder="Стоимость"
                                                 valueLink={linkState(this, 'product_in_act.cost')}/>
                                    <FormControl.Feedback />
                                    <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} componentClass={ControlLabel}>
                                    Статус
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
                                            this.setState({product_in_act: newProductInAct});
                                        }}/>
                                    <HelpBlock>Это поле должно быть заполнено.</HelpBlock>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onSave}>Сохранить</Button>
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
