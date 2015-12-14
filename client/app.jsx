require('bootstrap-webpack');
var React = require('react');
var ReactDOM = require('react-dom');
var Root = require('./root.jsx');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route; 
// import { Router, Route, Link } from 'react-router'



 ReactDOM.render(
   <Router>
    <Route path="/" component={Root}>
    </Route>
   </Router>,
   document.getElementById('body')
 );
