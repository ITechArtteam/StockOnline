import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRedirect, Route, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Clients from "./containers/systemClients/Clients";
import EditClient from "./containers/editClient/EditClient";
import Reports from "./containers/Reports";
import ReportIncome from "./containers/ReportIncome";
import ReportStandard from "./containers/ReportStandard";
import Stocks from "./containers/stocks/Stocks";
import EditStock from "./containers/EditStock";
import Workers from "./containers/Workers";
import EditWorker from "./containers/EditWorker";
import Carriers from "./containers/Carriers";
import EditCarrier from "./containers/EditCarrier";
import Drivers from "./containers/Drivers";
import EditDriver from "./containers/EditDriver";
import Waybills from "./containers/Waybills";
import EditWaybill from "./containers/EditWaybill";
import Goods from "./containers/Goods";
import ReceiptGoods from "./containers/ReceiptGoods";
import DistributionGoods from "./containers/DistributionGoods";
import DepartureGoods from "./containers/DepartureGoods";
import CheckGoods from "./containers/CheckGoods";
import Acts from "./containers/Acts";
import EditAct from "./containers/EditAct";
import RequireRole from "./containers/RequireRole"
import "jquery/dist/jquery.min";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/js/bootstrap-select.min";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "./global.css";

import {client} from "./actions"

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="login" />
                <Route path="/login" component={Login}/>
                <Route path="/clients" requiredRole="SUPER_ADMIN" component={RequireRole(Clients)}/>
                <Route path="/client(/:name)" requiredRole="SUPER_ADMIN" component={RequireRole(EditClient)}/>
                <Route path="/reports" requiredRole="BOSS_STOCK" component={RequireRole(Reports)}/>
                <Route path="/report/income" requiredRole="SUPER_ADMIN" component={RequireRole(ReportIncome)}/>
                <Route path="/report/standard" requiredRole="BOSS_STOCK" component={RequireRole(ReportStandard)}/>
                <Route path="/stocks" requiredRole="ADMIN" component={RequireRole(Stocks)}/>
                <Route path="/stock(/:id)" requiredRole="ADMIN" component={RequireRole(EditStock)}/>
                <Route path="/workers" requiredRole="ADMIN" component={RequireRole(Workers)}/>
                <Route path="/worker(/:id)" requiredRole="ADMIN" component={RequireRole(EditWorker)}/>
                <Route path="/carriers" requiredRole="DISPATCHER" component={RequireRole(Carriers)}/>
                <Route path="/carrier(/:id)" requiredRole="DISPATCHER" component={RequireRole(EditCarrier)}/>
                <Route path="/drivers" requiredRole="DISPATCHER" component={RequireRole(Drivers)}/>
                <Route path="/driver(/:id)" requiredRole="DISPATCHER" component={RequireRole(EditDriver)}/>
                <Route path="/waybills" requiredRole="DISPATCHER" component={RequireRole(Waybills)}/>
                <Route path="/waybill(/:id)" requiredRole="DISPATCHER" header="Редактирование накладной" component={RequireRole(EditWaybill)}/>
                <Route path="/goods" requiredRole="BOSS_STOCK" component={RequireRole(Goods)}/>
                <Route path="/goods/receipt" requiredRole="MANAGER" component={RequireRole(ReceiptGoods)}/>
                <Route path="/goods/distribution" requiredRole="MANAGER" component={RequireRole(DistributionGoods)}/>
                <Route path="/goods/departure" requiredRole="MANAGER" component={RequireRole(DepartureGoods)}/>
                <Route path="/goods/check" requiredRole="CONTROLLER" component={RequireRole(CheckGoods)}/>
                <Route path="/acts" requiredRole="BOSS_STOCK" component={RequireRole(Acts)}/>
                <Route path="/act(/:id)" requiredRole="CONTROLLER" component={RequireRole(EditAct)}/>
                <Route path="*" component={RequireRole(NotFound)}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

