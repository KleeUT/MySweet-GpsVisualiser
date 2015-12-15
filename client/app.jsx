require('bootstrap-webpack');
var React = require('react');
var ReactDOM = require('react-dom');
var Root = require('./root.jsx');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route; 

var MapContainer = require('./MapContainer.jsx');
var LocationSubmitForm = require('./LocationSubmitForm.jsx');
var InactivityReport = require('./InactivityReport.jsx');

 ReactDOM.render(
   <Router>
    <Route path="/" component={Root}>
      <Route path="Map" component={MapContainer} />
      <Route path="LocationSubmit" component={LocationSubmitForm} />
      <Route path="Inactivity" component={InactivityReport} />
    </Route>
   </Router>,
   document.getElementById('body')
 );
