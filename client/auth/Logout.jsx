var auth = require('./auth.js');
const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
});

module.exports = Logout;