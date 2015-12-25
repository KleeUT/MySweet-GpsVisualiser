var Link = require('react-router').Link;
var Dashboard = React.createClass({
	getInitialState(){
		return {
			links:[
				{url:"/Map", name:"Map"},
				{url:"/Inactivity", name:"Inactivity"},
				{url:"/LocationSubmit", name:"Location Submit"},
				{url:"/Config", name:"Config"},
			]
		}
	},
	render(){
		return(
			<div className="row">
				{this.state.links.map(item =>{
					return (
						<Link to={item.url}>
							<div className="well col-xs-12, col-xs-4, col-md-3" style={{margin:10}}>
								<h2>{item.name}</h2>
							</div>
						</Link>
					)
				})}
			</div>
		)
	}
});

module.exports = Dashboard;