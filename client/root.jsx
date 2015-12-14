/* @jsx React.DOM */
var React = require('react');
var MapContainer = require('./MapContainer.jsx');
var LocationSubmitForm = require('./LocationSubmitForm.jsx');
module.exports = React.createClass({
   render(){
     return (
       <div className='container'>
         <h1>My Sweet</h1>
         <MapContainer></MapContainer>
         <LocationSubmitForm></LocationSubmitForm>
         <footer><div style={{"textAlign":"right"}}>Klee Uhrig-Thomas</div></footer>
       </div>
     );
   }
 });
