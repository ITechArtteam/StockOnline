import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import _ from "lodash";
import moment from "moment";
class ActsTable extends React.Component {

    constructor(props) {
        super(props);

    }

    state = {
        acts: [],
        serch: this.props.serch,
        selected: this.props.selected,
        controllers: {}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({serch: nextProps.serch, selected: nextProps.selected});
        this.updateProps(nextProps);
    }

    componentWillMount() {
        this.updateProps(this.props);
    }

    updateProps=(props)=>{
        var newActs = [];
        _.forEach(props.acts, (act)=> {
            var newAct = {};
            newAct.id = act.id;
            newAct.date = new Date(act.reportDate);
            newAct.product_name = act.product.name;
            newAct.cost = act.cost;
            newAct.user_login = act.user.login;
            newAct.status=act.status;
            newActs.push(newAct);
        });
        this.setState({acts: newActs});
        var newControllers = {};
        _.forEach(props.controllers, (controller)=> {
            newControllers[controller.id]=controller.login;
        });
        this.setState({controllers: newControllers});
    }


    render() {
        const onRowSelect = ({id}, isSelected) => {
            var selected;
            if (isSelected) {
                selected = [...this.state.selected, id].sort();
            } else {
                selected = this.state.selected.filter(it => it !== id);
            }
            this.props.onRowSelect(selected);
            this.setState({selected: selected});
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
            this.props.onSelectAll(selected);
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


        function dateFormatter(cell, row) {
            return moment(cell).format("llll");
        }


        return (
            <BootstrapTable data={this.state.acts}
                            striped={true}
                            hover={true}
                            condensed={true}
                            pagination={true}
                            selectRow={selectRowProp}
                            ref="table"

            >
                <TableHeaderColumn dataField="id" hidden={true} isKey={true}>Идентификатор</TableHeaderColumn>
                <TableHeaderColumn dataField="date" dataSort={true} dataFormat={ dateFormatter }
                                   filter={ {type: 'DateFilter'} }>Дата</TableHeaderColumn>
                <TableHeaderColumn dataField="product_name" filter={ {type: 'TextFilter'} }
                                   dataSort={true}>Продукт</TableHeaderColumn>
                <TableHeaderColumn dataField="status" filter={ {type: 'TextFilter'} }
                                   dataSort={true}>Статус</TableHeaderColumn>
                <TableHeaderColumn dataField="cost" filter={ {
                    type: 'NumberFilter',
                    numberComparators: ['=', '>', '<=']
                } } dataSort={true}>Сумма</TableHeaderColumn>
                <TableHeaderColumn dataField="user_login" dataSort={true}
                                   filterFormatted
                                   formatExtraData={  this.state.controllers }
                                   filter={ {
                                       type: 'SelectFilter',
                                       options: this.state.controllers
                                   } }>Контролёр</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}
export default ActsTable;

