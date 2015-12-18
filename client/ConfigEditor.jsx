/* @jsx React.DOM */
var EditForm = React.createClass({
	getInitialState(){
		return{key: this.props.id, value: this.props.value, dirty:false};	
	},
	edit(e){
		var newValue = e.target.value;
		this.setState({dirty: this.props.value != newValue, value:newValue});	
	},
	save(){
		console.log(`saving ${this.props.id} ${this.state.value}`)
		this.props.onSave(this.props.id, this.state.value);
	},
	render(){
		console.log(this.state);
		return(
		<tr>
		<td>{this.state.key}</td><td><input type="text" value={this.state.value} onChange={this.edit} /></td><td><button type='submit' className="btn btn-primary" style={{display:this.state.dirty?"inline":"none"}} onClick={this.save}>Save</button></td>
		</tr>
		)
	}
});

var ConfigEditor = React.createClass({
	getInitialState(){
		return {unmappedConfigItems: [], mappedConfigItems:[]};
	},
	componentDidMount(){
		var self = this;
		$.ajax({
			url:'/api/config/mappedandunmappedids',
			success:(data) => {
				console.log(data);
				self.setState({unmappedConfigItems: data.unmapped, mappedConfigItems:data.mapped})
			},
			error: (error) => {
				console.log("error");
			}
		});
	var socket = io();
    socket.on('ConfigUpdated', function(msg){
		console.log("ConfigUpdate Received");
		self.setState({unmappedConfigItems: msg.unmapped, mappedConfigItems:msg.mapped})
 	});   
		
	},
	configEntrySaved(key, newValue){
		console.log(`Save called for ${key} with value ${newValue}`);
		$.post('/api/config/map', {key:key, value:newValue}, "json");
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
						<EditForm id={item.key} value={item.value} onSave={this.configEntrySaved}/>
					)
				}
				)}
				</tbody>
				</table>
				<h1>Mapped Ids</h1>
								<table className="table table-striped">
				<thead>
				<tr>
				<th>Id</th><th>Displayed Value</th>
				</tr>
				</thead>
				<tbody>
				{this.state.mappedConfigItems.map(item => {
					return(
						<EditForm id={item.key} value={item.value} onSave={this.configEntrySaved}/>
					)
				}
				)}
				</tbody>
				</table>
				<button className="btn btn-default"> + </button>
			</div>
		)
	}
});

module.exports = ConfigEditor;