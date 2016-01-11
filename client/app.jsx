require('bootstrap-webpack');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route; 
var IndexRoute = ReactRouter.IndexRoute;
var BrowserHistory = ReactRouter.browserHistory; 

var auth = require('./auth/auth.js');

var Root = require('./root.jsx');
var Dashboard = require("./Dashboard.jsx");
var MapContainer = require('./MapContainer.jsx');
var LocationSubmitForm = require('./LocationSubmitForm.jsx');
var InactivityReport = require('./InactivityReport.jsx');
var ConfigEditor = require('./ConfigEditor.jsx');
var Login = require('./auth/Login.jsx');
var Logout = require('./auth/Logout.jsx');

function requireAuth(nextState, replaceState) {
    console.log(`Logged in: ${auth.loggedIn()}`);
    if (!auth.loggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/Login')
    }
}

 ReactDOM.render(
   <Router history={BrowserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Dashboard}  onEnter={requireAuth}/>
      <Route path="Map" component={MapContainer} onEnter={requireAuth}/>
      <Route path="LocationSubmit" component={LocationSubmitForm}  onEnter={requireAuth}/>
      <Route path="Inactivity" component={InactivityReport}  onEnter={requireAuth}/>
      <Route path="Config" component={ConfigEditor}  onEnter={requireAuth}/>
      <Route path="Login" component={Login} />
      <Route path="Logout" component={Logout} onEnter={requireAuth}/>
    </Route>    
   </Router>,
   document.getElementById('body')
 );
