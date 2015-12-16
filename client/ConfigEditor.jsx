/* @jsx React.DOM */
var React = require('react');
var EditForm = React.createClass({
	getInitialState(){
		return{key: this.props.id, value: this.props.value, dirty:false};	
	},
	edit(e){
		this.setState({dirty: !this.state.dirty});	
	},
	render(){
		console.log(this.state);
		return(
		<tr>
		<td>{this.state.key}</td><td><input type="text" value={this.state.value} onChange={this.edit} /></td><td><button className="btn btn-primary" style={{display:this.state.dirty?"inline":"none"}}>Save</button></td>
		</tr>
		)
	}
});
var ConfigEditor = React.createClass({
	getInitialState(){
		return {unmappedConfigItems: [{key:"test",value:"value test"}]};	
	},
	render(){
		return(
			<div>
			<h1>Unmapped Ids</h1>
				<table className="table table-striped">
				<thead>
				<tr>
				<th>Id</th><th>Displayed Value</th>
				</tr>
				</thead>
				<tbody>
				{this.state.unmappedConfigItems.map(item => {
					return(
						<EditForm id={item.key} value={item.value} />
					)
				}
				)}
				</tbody>
				</table>
				<h1>Mapped ids</h1>
				<button className="btn btn-default"> + </button>
			</div>
		)
	}
});

module.exports = ConfigEditor;