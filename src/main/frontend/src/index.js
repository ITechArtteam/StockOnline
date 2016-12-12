import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRedirect, Route, browserHistory} from 'react-router';
import store from './store/configureStore';
import App from './containers/App';
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Clients from "./containers/systemClients/Clients";
import EditClient from "./containers/editClient/EditClient";
import SearchTransportCompanyForDriver from "./containers/searchTransportCompanyForDriver/SearchTransportCompanyForDriver";
import SearchTransportCompanyForTrain from "./containers/searchTransportCompanyForTrain/SearchTransportCompanyForTrain";
import RegistrationOfGoods from "./containers/registrationOfGoods/RegistrationOfGoods";
import Reports from "./containers/Reports";
import ReportIncome from "./containers/ReportIncome";
import ReportStandard from "./containers/ReportStandard";
import Stocks from "./containers/stocks/Stocks";
import EditStock from "./containers/editStock/EditStock";
import EditDriver from "./containers/editDriver/EditDriver";
import WorkersContainer from "./containers/WorkersContainer";
import EditWorkerContainer from "./containers/EditWorkerContainer";
import Waybills from "./containers/Waybills";
import WaybillRegistration from "./containers/WaybillRegistration/WaybillRegistration";
import Goods from "./containers/Goods";
import ReceiptGoods from "./containers/ReceiptGoods";
import DistributionGoods from "./containers/DistributionGoods/DistributionGoods";
import DepartureGoods from "./containers/DepartureGoods";
import CheckOutputGoods from "./components/checkGoods/CheckOutputGoods";
import CheckInputGoods from "./components/checkGoods/CheckInputGoods"
import DispatcherFinishOutput from "./components/finishOutput/DispatcherFinishOutput"
import ActsContainer from "./containers/ActsContainer";
import ShowActContainer from "./containers/ShowActContainer";
import EditActContainer from "./containers/EditActContainer";

import GoodsDeparture from './containers/GoodsDeparture/GoodsDeparture'
import GoodsDepartureSearchTransportCompanyForDriver from './containers/searchTransportCompanyForDriverExport/SearchTransportCompanyForDriver'
import GoodsDepartureSearchTransportCompanyForTrain from './containers/searchTransportCompanyForTrainExport/SearchTransportCompanyForTrain'
import GoodsDepartureEditDriver from './containers/editDriverExport/EditDriver'
import GoodsDepartureWaybillRegistration from './containers/WaybillRegistrationExport/WaybillRegistration'

import RequireRole from "./containers/RequireRole"
import "bootstrap-webpack";
import "bootstrap-select/dist/js/bootstrap-select.min";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "./global.css";

import {client} from "./actions";
import {stock} from "./actions";

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/login" component={Login}/>
            <IndexRedirect to="/login" />
            <Route path="/" component={App}>
                <IndexRedirect to="/login" />
                <Route path="/clients" requiredRole={["SUPER_ADMIN"]} component={RequireRole(Clients)}/>
                <Route path="/client(/:name)" requiredRole={["SUPER_ADMIN"]} component={RequireRole(EditClient)}/>
                <Route path="/reports" requiredRole={["BOSS_STOCK"]} component={RequireRole(Reports)}/>
                <Route path="/report/income" requiredRole={["SUPER_ADMIN"]} component={RequireRole(ReportIncome)}/>
                <Route path="/report/standard" requiredRole={["BOSS_STOCK"]} component={RequireRole(ReportStandard)}/>
                <Route path="/stocks" requiredRole={["ADMIN"]} component={RequireRole(Stocks)}/>
                <Route path="/stock(/:id)" requiredRole={["ADMIN"]} component={RequireRole(EditStock)}/>
                <Route path="/workers" requiredRole={["ADMIN"]} component={RequireRole(WorkersContainer)}/>
                <Route path="/worker(/:id)" requiredRole={["ADMIN"]} component={RequireRole(EditWorkerContainer)}/>
                <Route path="/registrationOfGoods" requiredRole={["DISPATCHER"]} component={RequireRole(RegistrationOfGoods)}/>
                <Route path="/registrationOfGoods/driver(/:passportNumber)" requiredRole={["DISPATCHER"]} component={RequireRole(SearchTransportCompanyForDriver)}/>
                <Route path="/registrationOfGoods/train" requiredRole={["DISPATCHER"]} component={RequireRole(SearchTransportCompanyForTrain)}/>
                <Route path="/waybills" requiredRole={["DISPATCHER"]} component={RequireRole(Waybills)}/>
                <Route path="/registerwaybill" requiredRole={["DISPATCHER"]} component={RequireRole(WaybillRegistration)}/>
                <Route path="/registrationOfGoods/editDriver(/:id)" requiredRole={["DISPATCHER"]} component={RequireRole(EditDriver)}/>
                <Route path="/goods" requiredRole={["BOSS_STOCK", "CONTROLLER"]} component={RequireRole(Goods)}/>
                <Route path="/goods/receipt" requiredRole={["MANAGER"]} component={RequireRole(ReceiptGoods)}/>
                <Route path="/goods/distribution" requiredRole={["MANAGER"]} component={RequireRole(DistributionGoods)}/>

                <Route path="/goods/departure" requiredRole={["MANAGER"]} component={RequireRole(GoodsDeparture)}/>
                <Route path="/goods/departure/driver(/:passportNumber)" requiredRole={["MANAGER"]} component={RequireRole(GoodsDepartureSearchTransportCompanyForDriver)}/>
                <Route path="/goods/departure/train" requiredRole={["MANAGER"]} component={RequireRole(GoodsDepartureSearchTransportCompanyForTrain)}/>
                <Route path="/goods/departure/editDriver(/:id)" requiredRole={["MANAGER"]} component={RequireRole(GoodsDepartureEditDriver)}/>
                <Route path="/waybill/export" requiredRole={["MANAGER"]} component={RequireRole(GoodsDepartureWaybillRegistration)}/>

                <Route path="/goods/checkInput" requiredRole={["CONTROLLER"]} component={RequireRole(CheckInputGoods)}/>
                <Route path="/goods/checkOutput" requiredRole={["CONTROLLER"]} component={RequireRole(CheckOutputGoods)}/>
                <Route path="/finishOutput" requiredRole={["DISPATCHER"]} component={RequireRole(DispatcherFinishOutput)}/>
                <Route path="/acts" requiredRole={["BOSS_STOCK"]} component={RequireRole(ActsContainer)}/>
                <Route path="/show_act(/:id)" requiredRole={["BOSS_STOCK"]} component={RequireRole(ShowActContainer)}/>
                <Route path="/act(/:id)" requiredRole={["CONTROLLER"]} component={RequireRole(EditActContainer)}/>
                <Route path="*" component={RequireRole(NotFound)}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
