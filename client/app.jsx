require('bootstrap-webpack');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route; 
var IndexRoute = ReactRouter.IndexRoute;

var Root = require('./root.jsx');
var Dashboard = require("./Dashboard.jsx");
var MapContainer = require('./MapContainer.jsx');
var LocationSubmitForm = require('./LocationSubmitForm.jsx');
var InactivityReport = require('./InactivityReport.jsx');
var ConfigEditor = require('./ConfigEditor.jsx');

 ReactDOM.render(
   <Router>
    <Route path="/" component={Root}>
      <IndexRoute component={Dashboard} />
      <Route path="Map" component={MapContainer} />
      <Route path="LocationSubmit" component={LocationSubmitForm} />
      <Route path="Inactivity" component={InactivityReport} />
      <Route path="Config" component={ConfigEditor} />
    </Route>
   </Router>,
   document.getElementById('body')
 );
