var Link = require('react-router').Link;
module.exports = React.createClass({
   render(){
     return (
       <div className='container'>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>              
                <Link className="navbar-brand" to="#">My Sweet</Link>
              </div>
              
              <div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to="#">Home</Link></li>
                    <li><Link to='/Map'>Map</Link></li>
                    <li><Link to='/Inactivity'>Inactivity</Link></li>
                    <li><Link to='/LocationSubmit'>Location Submit</Link></li>
                    <li><Link to='/Config'>Config</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
         {this.props.children}
         <footer><div style={{"textAlign":"right"}}>KleeUT</div></footer>
       </div>
     );
   }
 });
