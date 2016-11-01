import React from "react";

class EditStock extends React.Component {
    render() {
        return (
            <div className="container">
                <form className="form-horizontal" id="stock_form">
                    <div className="form-group">
                        <label htmlFor="stock_owner" className="col-sm-2 control-label">Владелец</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="stock_owner" placeholder="Владелец"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_name" className="col-sm-2 control-label">Название</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="stock_name" placeholder="Название"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_country" className="col-sm-2 control-label">Страна</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="stock_country" placeholder="Страна"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_city" className="col-sm-2 control-label">Город</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="stock_city" placeholder="Город"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_house" className="col-sm-2 control-label">Дом</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="stock_house" placeholder="Дом"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_apartment" className="col-sm-2 control-label">Квартира</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="stock_apartment" placeholder="Квартира"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="btn-group" role="group">
                                <button type="submit" className="btn btn-primary">Сохранить</button>
                                <button type="button" className="btn btn-default">Отменить</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditStock;
