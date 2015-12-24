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
		this.props.onSave(this.props.id, this.state.value);
	},
	render(){
		return(
		<tr>
		<td>{this.state.key}</td><td><input type="text" value={this.state.value} onChange={this.edit} /></td><td><button type='submit' className="btn btn-primary" style={{display:this.state.dirty?"inline":"none"}} onClick={this.save}>Save</button></td>
		</tr>
		)
	}
});

var AddForm = React.createClass({
	getInitialState(){
		return{key: undefined, value: undefined, dirty:false, adding:false};	
	},
	editName(e){
		var newValue = e.target.value;
		var dirty = newValue != "" || this.state.key != "";
		this.setState({dirty: this.props.value != newValue, value:newValue});	
	},
	editId(e){
		var newId = e.target.value;
		var dirty = newId != "" || this.state.value != "";
		this.setState({dirty: dirty, key:newId});
	},
	
	save(){
		var key = this.state.key;
		var value = this.state.value;
		
		this.setState({key: undefined, value: undefined, dirty:false, adding:false})
		this.props.onSave(key, value);
	},
	cancel(){
		this.setState({key: undefined, value: undefined, dirty:false, adding:false})
	},
	
	startAdding(){
		this.setState({adding:true});	
	},
	
	render(){
			var addButton = ( <div> 
								<button className="btn btn-primary" onClick={this.startAdding}> + </button>
							  </div> );
			var addForm = ( <div className="well">
								<h1>Add Mapping</h1>
								<div className='form-group'>
									<input type="text" value={this.state.key} onChange={this.editId} className='form-control' placeholder="Device Id"/>
								</div>
								<div className='form-group'>
									<input type="text" value={this.state.value} onChange={this.editName} className='form-control' placeholder="Friendly Name"/>
								</div>
								<div className='form-group'>
									<button type='submit' className="btn btn-primary form-control" disabled={!this.state.dirty} onClick={this.save}>Save</button>
								</div>
								<div className='form-group'>
									<button className="btn btn-default  form-control" onClick={this.cancel}>Cancel</button>
								</div>
							</div> );
		
		if(this.state.adding){
			return addForm;
		}
		
		return addButton;
	}
});

var ConfigEditor = React.createClass({
	getInitialState(){
		return {unmappedConfigItems: [], mappedConfigItems:[], adding:false};
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
		console.log(msg);
		self.setState({unmappedConfigItems: msg.unmapped, mappedConfigItems:msg.mapped})
 	});   
		
	},
	configEntrySaved(key, newValue){	
		$.post('/api/config/map', {key:key, value:newValue}, "json");
	},
	addNew(key, value){
		var data = {key:key, value:value}
		console.log("saving");
		console.log(data);
		$.post('/api/config/map', data, "json");
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
					console.log("rending");
				
					console.log(item);
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
				<AddForm onSave={this.addNew}/>
				
			</div>
		)
	}
});

module.exports = ConfigEditor;