import React from 'react'
import {Link} from 'react-router'

class ClientsTable extends React.Component {
    render() {
        var pages = (() => {
            var items = [];
            var firstLink;
            var prevLink;
            var nextLink;
            var lastLink;
            if(this.props.currentPage === 1) {
                firstLink = <li className="disabled"><a>&laquo;</a></li>;
                prevLink = <li className="disabled"><a>&lt;</a></li>;
            } else {
                firstLink = <li><a href="#" onClick={() => this.props.gotoPage(1, this.props.limit)}>&laquo;</a></li>;
                prevLink = <li><a href="#" onClick={() => this.props.gotoPage(this.props.currentPage - 1, this.props.limit)}>&lt;</a></li>;
            }

            if(this.props.currentPage === this.props.pageCount) {
                lastLink = <li className="disabled"><a>&raquo;</a></li>;
                nextLink = <li className="disabled"><a>&gt;</a></li>;
            } else {
                lastLink = <li><a href="#" onClick={() => this.props.gotoPage(this.props.pageCount, this.props.limit)}>&raquo;</a></li>;
                nextLink = <li><a href="#" onClick={() => this.props.gotoPage(this.props.currentPage + 1, this.props.limit)}>&gt;</a></li>;
            }

            items.push(firstLink);
            items.push(prevLink);

            for (var i = this.props.currentPage - 2; i <= this.props.currentPage + 2; ++i) {
                const k = i;
                if(i >= 1 && i <= this.props.pageCount) {
                    var t;
                    if(i === this.props.currentPage) {
                        t = <li key={i} className="active"><a href="#" onClick={() => this.props.gotoPage(k, this.props.limit)}>{i}</a></li>
                    } else {
                        t = <li key={i}><a href="#" onClick={() => this.props.gotoPage(k, this.props.limit)}>{i}</a></li>
                    }
                    items.push(t)
                }
            }
            items.push(nextLink);
            items.push(lastLink);
            return items;
        })();
        return (
            <nav>
                <ul className="pagination">
                    {pages}
                </ul>
            </nav>
        )
    }
}

ClientsTable.propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    pageCount: React.PropTypes.number.isRequired,
    limit: React.PropTypes.number.isRequired,
    gotoPage: React.PropTypes.func.isRequired
};

export default ClientsTable;


