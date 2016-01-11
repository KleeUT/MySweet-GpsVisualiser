var auth = require('./auth.js');
const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const  location = this.props

      if (location.state && location.state.nextPathname) {
          console.log("1");
          console.log(`${this === undefined} ${this.context === undefined} ${this.context.router === undefined}`);
        this.context.router.replace(location.state.nextPathname)
      } else {
          console.log("1");
          
          console.log(`${this === undefined} ${this.context === undefined} ${this.context.router === undefined}`);
        this.context.router.replace('/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input ref="email" placeholder="email" defaultValue="joe@example.com" className="form-control"/>
      </div>
      <div className="form-group">
        <input ref="pass" placeholder="password" className="form-control"/> (hint: password1)
        </div>
      <div className="form-group">
      <button type="submit" className="form-control btn-primary">Login</button>
      </div>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
});

module.exports = Login;