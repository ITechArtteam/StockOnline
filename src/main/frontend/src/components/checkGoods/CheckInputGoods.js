import React from 'react'
import CheckGoods from '../../containers/checkGoods/CheckGoods'

class CheckInputGoods extends React.Component {
    render(){
        return (
            <CheckGoods expectedWaybillStatus="Зарегистрирована"
                        finalWaybillStatus="Проверка завершена"
                        finalProductStatus="Проверка завершена"
                        acceptButtonText="Завершить проверку"
                        senderRole="controller"/>
        )
    }
}

export default CheckInputGoods;


