import React from 'react'

const TransportNumbersList = (props) => {
    const numbers = props.numbers.map((number) => {
        return <li className="list-group-item">{number}</li>
    });

    const emptyList = (
        <li className="list-group-item">Нет ни одного номера</li>
    );

    return (
        <div className="form-group">
            <label className="control-label">Номера транспортных средств</label>
            <ul className="list-group">{numbers.length != 0 ? numbers : emptyList}</ul>
        </div>
    )
};

export default TransportNumbersList;