import React from 'react'
import CheckGoods from '../../containers/checkGoods/CheckGoods'

class CheckOutputGoods extends React.Component {
    render(){
        return (
            <div>
                <CheckGoods expectedWaybillStatus="Партия сформирована"
                            finalWaybillStatus="Выпуск разрешен"
                            finalProductStatus="Выпуск разрешен"
                            acceptButtonText="Разрешить выпуск"
                            senderRole="controller"
                />
            </div>
        )
    }
}

export default CheckOutputGoods;


