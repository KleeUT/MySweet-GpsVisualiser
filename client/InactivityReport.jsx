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
				console.log(data);
				self.setState({
					inactivities:data.map(item =>{
						item.key = item.name;
						return item;
					})
				});
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
								console.log(item);

							return(
								<tr>
									<td>{item.name}</td>
									<td>{formatDate(new Date(item.endTime) - new Date(item.startTime))}</td>
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
		
		function formatDate(diff){
			var days = Math.floor(diff / (1000 * 60 * 60 * 24));
			diff -=  days * (1000 * 60 * 60 * 24);
			
			var hours = Math.floor(diff / (1000 * 60 * 60));
			diff -= hours * (1000 * 60 * 60);
			
			var mins = Math.floor(diff / (1000 * 60));
			diff -= mins * (1000 * 60);
			
			var seconds = Math.floor(diff / (1000));
			diff -= seconds * (1000);
			
			return `${hours}:${mins}:${seconds}`;
		}
	}
})