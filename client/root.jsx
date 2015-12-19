var Link = require('react-router').Link;
module.exports = React.createClass({
   render(){
     return (
       <div className='container'>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">My Sweet</a>
              </div>
              <div>
                <ul className="nav navbar-nav">
                  <li><Link to="#">Home</Link></li>
                  <li><Link to='/Map'>Map</Link></li>
                  <li><Link to='/Inactivity'>Inactivity</Link></li>
                  <li><Link to='/LocationSubmit'>Location Submit</Link></li>
                  <li><Link to='/Config'>Config</Link></li>
                </ul>
              </div>
            </div>
          </nav>
         {this.props.children}
         <footer><div style={{"textAlign":"right"}}>KleeUT</div></footer>
       </div>
     );
   }
 });
