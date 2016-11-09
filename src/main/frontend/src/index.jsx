import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, IndexRedirect, Route, browserHistory} from 'react-router'

import App from './containers/App.jsx'
import NotFound from "./containers/NotFound.jsx";
import Login from "./containers/Login.jsx";
import Clients from "./containers/Clients.jsx";
import EditClient from "./containers/editClient/EditClient.jsx";
import Reports from "./containers/Reports.jsx";
import ReportIncome from "./containers/ReportIncome.jsx";
import ReportStandard from "./containers/ReportStandard.jsx";
import Stocks from "./containers/Stocks.jsx";
import EditStock from "./containers/EditStock.jsx";
import Workers from "./containers/Workers.jsx";
import Carriers from "./containers/Carriers.jsx";
import EditCarrier from "./containers/EditCarrier.jsx";
import Drivers from "./containers/Drivers.jsx";
import EditDriver from "./containers/EditDriver.jsx";
import Waybills from "./containers/Waybills.jsx";
import EditWaybill from "./containers/EditWaybill.jsx";
import Goods from "./containers/Goods.jsx";
import ReceiptGoods from "./containers/ReceiptGoods.jsx";
import DistributionGoods from "./containers/DistributionGoods.jsx";
import DepartureGoods from "./containers/DepartureGoods.jsx";
import CheckGoods from "./containers/CheckGoods.jsx";
import Acts from "./containers/Acts.jsx";
import EditAct from "./containers/EditAct.jsx";
import EditWorker from "./containers/EditWorker.jsx";
import configureStore from './store/configureStore'
import "jquery/dist/jquery.min"
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap-theme.min.css"


import {client} from "./actions"

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="login" />
                <Route path="/login" component={Login}/>
                <Route path="/clients" component={Clients}/>
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

