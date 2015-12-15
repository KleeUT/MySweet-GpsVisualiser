/* @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
module.exports = React.createClass({
   render(){
     return (
       <div className='container'>
       <div>
       <Link to='/Map'>Map</Link> | <Link to='/LocationSubmit'>Location Submit</Link> | <Link to='/Inactivity'>Inactivity</Link>
       </div>
         {this.props.children}
         <footer><div style={{"textAlign":"right"}}>Klee Uhrig-Thomas</div></footer>
       </div>
     );
   }
 });
