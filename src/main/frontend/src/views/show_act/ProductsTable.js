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
        products: this.props.products,

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products,
        });
        this.updateProps(nextProps);
    }

    componentWillMount() {
        this.updateProps(this.props);

    }

    updateProps = (props)=> {
        console.log(props)
    }



    render() {


        function productFormatter(cell, row) {
            return cell.name;
        }

        function countFormatter(cell, row) {
            return cell + " " + row.product.unit;
        }


        return (


            <div>
                <Row>
                    <BootstrapTable data={this.state.products}
                                    striped={true}
                                    hover={true}
                                    condensed={true}
                                    pagination={true}
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
