var React = require('react');
module.exports = React.createClass({
  getInitialState(){
    return{lat:0.0,long:0.0,name:""}
  },
  onSubmit(){
    console.log(`${this.state.lat}, ${this.state.long}, ${this.state.name}, `)
    $.ajax({
      url:"/api/location",
      method:"POST",
      data: {
        data: JSON.stringify(
          {
            lat:this.state.lat,
            long:this.state.long,
            name:this.state.name
        })
      },
      dataType:'JSON',
      // success:(data) => console.log("win"),
      // error:(data) => alert("error"),
    })
  },
  latChanged(e){
    this.setState({lat:e.target.value});
  },

  longChanged(e){
    this.setState({long:e.target.value});
  },

  nameChanged(e){
    this.setState({name:e.target.value});
  },
  render(){

    return(
      <div className='row'>
        <form action="#">
          <div className='form-group'>
            <input type='number' className='form-control' placeholder="Latitude" text={this.state.lat} onChange={this.latChanged}></input>
          </div>
          <div className='form-group'>
            <input type='number' className='form-control' placeholder="Longitude" text={this.state.long} onChange={this.longChanged}></input>
          </div>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder="Name" text={this.state.name} onChange={this.nameChanged}></input>
          </div>
          <div className='form-group'>
          <button type="button" className="btn btn-primary" onClick={this.onSubmit} >Submit</button>
          </div>
        </form>
      </div>
    );

  }
})
