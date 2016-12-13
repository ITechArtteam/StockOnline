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
    }

    componentWillReceiveProps(nextProps) {
        this.setState({serch: nextProps.serch, selected: nextProps.selected, acts:nextProps.acts});
        this.updateProps(nextProps);
    }

    componentWillMount() {
        this.updateProps(this.props);
    }

    updateProps=(props)=>{

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
            return moment(cell).format("lll");
        }

        function userFormatter(cell, row){
            return cell.login;
        }

        function waybillFormatter(cell, row){
            return cell.number;
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
                <TableHeaderColumn dataField="reportDate" dataSort={true} dataFormat={ dateFormatter }
                                   filter={ {type: 'DateFilter'} }>Дата</TableHeaderColumn>
                <TableHeaderColumn dataField="user" filter={ {type: 'TextFilter'} }
                                   dataSort={true} dataFormat={userFormatter}>Контролер</TableHeaderColumn>
                <TableHeaderColumn dataField="waybill" dataFormat={waybillFormatter} filter={ {type: 'TextFilter'} }
                                   dataSort={true}>ТТН</TableHeaderColumn>

            </BootstrapTable>
        )
    }
}
export default ActsTable;

