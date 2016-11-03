import React from 'react'

class EditWorker extends React.Component {
    render(){
        return (
            <div className="row">
                <form className="form-horizontal" id="worker_form">
                    <div className="form-group">
                        <label htmlFor="worker_name" className="col-sm-2 control-label">Имя</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_name" placeholder="Имя"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_surname" className="col-sm-2 control-label">Фамилия</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_surname" placeholder="Фамилия"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_patronymic" className="col-sm-2 control-label">Отчество</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_patronymic" placeholder="Отчество"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_date" className="col-sm-2 control-label">Дата рождения</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="worker_date"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_email" className="col-sm-2 control-label">Электронная почта</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="worker_email" placeholder="Электронная почта"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_country" className="col-sm-2 control-label">Страна</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_country" placeholder="Страна"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_city" className="col-sm-2 control-label">Город</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_city" placeholder="Город"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_house" className="col-sm-2 control-label">Дом</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_house" placeholder="Дом"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_apartment" className="col-sm-2 control-label">Квартира</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_apartment" placeholder="Квартира"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_role" className="col-sm-2 control-label">Роль</label>
                        <div className="col-sm-10">
                            <select id="worker_role" className="selectpicker" title="Выберите роли" multiple>
                                <option>Администратор системы</option>
                                <option>Администратор склада</option>
                                <option>Диспетчер склада</option>
                                <option>Диспетчер склада</option>
                                <option>Контролёр</option>
                                <option>Диспетчер склада</option>
                                <option>Владенлец склада</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_login" className="col-sm-2 control-label">Логин</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_login" placeholder="Логин"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="worker_password" className="col-sm-2 control-label">Пароль</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="worker_password" placeholder="Пароль"/>
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

export default EditWorker;
