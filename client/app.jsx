require('bootstrap-webpack');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route; 
const IndexRoute = ReactRouter.IndexRoute;
const browserHistory = ReactRouter.browserHistory; 

const auth = require('./auth/auth.js');

const Root = require('./root.jsx');
const Dashboard = require("./Dashboard.jsx");
const MapContainer = require('./MapContainer.jsx');
const LocationSubmitForm = require('./LocationSubmitForm.jsx');
const InactivityReport = require('./InactivityReport.jsx');
const ConfigEditor = require('./ConfigEditor.jsx');
const Login = require('./auth/Login.jsx');
const Logout = require('./auth/Logout.jsx');

function requireAuth(nextState, replaceState) {
    console.log(`Logged in: ${auth.loggedIn()}`);
    if (!auth.loggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/Login')
    }
}
   
 ReactDOM.render((
   <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Dashboard}  onEnter={requireAuth}/>
      <Route path="Map" component={MapContainer} onEnter={requireAuth}/>
      <Route path="LocationSubmit" component={LocationSubmitForm}  onEnter={requireAuth}/>
      <Route path="Inactivity" component={InactivityReport}  onEnter={requireAuth}/>
      <Route path="Config" component={ConfigEditor}  onEnter={requireAuth}/>
      <Route path="Login" component={Login} />
      <Route path="Logout" component={Logout} onEnter={requireAuth}/>
    </Route>    
   </Router>),
   document.getElementById('body')
 );
