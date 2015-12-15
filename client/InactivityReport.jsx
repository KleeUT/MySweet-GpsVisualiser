var React = require('react');

module.exports = React.createClass({
	getInitialState(){
		return {inactivities:[]}	
	},
	componentDidMount(){
		var self = this;
		$.ajax({
			url:"/api/allInactivity",
			success:function(data){
				self.setState({inactivities:data.map(item => item.key = item.name)})
			}
		})
	},
	render(){
		return(
			<div className='row'>
				<table className='table table-striped'>
					<thead>
					<tr>
						<th>Name</th>
						<th>Duration (min)</th>
						<th>Start</th>
						<th>Stop</th>
						<th>Lat</th>
						<th>Long</th>
					</tr>
					</thead>
					<tbody>
					{
						this.state.inactivities.map(item =>{
							return(
								<tr>
									<td>{item.name}</td>
									<td>{(item.stop - item.start)/100/60}</td>
									<td>{item.startTime}</td>
									<td>{item.endTime}</td>
									<td>{item.lat}</td>
									<td>{item.long}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}
})