import React from 'react'
import CheckGoods from '../../containers/checkGoods/CheckGoods'

class DispatcherFinishOutput extends React.Component {
    render(){
        return (
            <CheckGoods expectedWaybillStatus="Выпуск разрешен"
                        finalWaybillStatus="Вывезен со склада"
                        finalProductStatus="Вывезен со склада"
                        acceptButtonText="Разрешить выпуск"
                        senderRole="dispatcher"/>
        )
    }
}

export default DispatcherFinishOutput;


