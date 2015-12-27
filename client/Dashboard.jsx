var Link = require('react-router').Link;
var Dashboard = React.createClass({
	getInitialState(){
		return {
			links:[ ]
		}
	},
	componentDidMount(){
        var self = this;
		$.ajax({
			url:"/api/topLevelLinks",
			success:function(item){
                console.log("received links");
				self.setState({links:item.links});
			},
			error:function(item){
				console.log("error occured");
				console.log(item)
			}
		});
	},
	render(){
		return(
			<div className="row">
				{this.state.links.map(item =>{
					return (
						<Link to={item.url}>
							<div className="well col-xs-12, col-xs-4, col-md-3" style={{margin:10}}>
								<h2>{item.title}</h2>
							</div>
						</Link>
					)
				})}
			</div>
		)
	}
});

module.exports = Dashboard;