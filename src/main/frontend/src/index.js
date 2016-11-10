import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, IndexRedirect, Route, browserHistory} from 'react-router'
import configureStore from './store/configureStore'
import App from './containers/App'
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
import "jquery/dist/jquery.min"
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap-theme.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-select/dist/js/bootstrap-select.min";
import "bootstrap-select/dist/css/bootstrap-select.min.css"


import {client} from "./actions"

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="login" />
                <Route path="/login" component={Login}/>
                <Route path="/clients" requiredRole="ROLE_USER" component={RequireRole(Clients)}/>
                <Route path="/client(/:name)" component={EditClient}/>
                <Route path="/reports" component={Reports}/>
                <Route path="/report/income" component={ReportIncome}/>
                <Route path="/report/standard" component={ReportStandard}/>
                <Route path="/stocks" component={Stocks}/>
                <Route path="/stock/:id" component={EditStock}/>
                <Route path="/workers" component={Workers}/>
                <Route path="/worker/:id" component={EditWorker}/>
                <Route path="/carriers" component={Carriers}/>
                <Route path="/carrier/:id" component={EditCarrier}/>
                <Route path="/drivers" component={Drivers}/>
                <Route path="/driver/:id" component={EditDriver}/>
                <Route path="/waybills" component={Waybills}/>
                <Route path="/waybill/:id" component={EditWaybill}/>
                <Route path="/goods" component={Goods}/>
                <Route path="/goods/receipt" component={ReceiptGoods}/>
                <Route path="/goods/distribution" component={DistributionGoods}/>
                <Route path="/goods/departure" component={DepartureGoods}/>
                <Route path="/goods/check" component={CheckGoods}/>
                <Route path="/acts" component={Acts}/>
                <Route path="/act/:id" component={EditAct}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

