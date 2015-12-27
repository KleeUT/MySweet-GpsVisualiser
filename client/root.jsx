var Link = require('react-router').Link;
module.exports = React.createClass({
    getInitialState(){
        return({links:[]});   
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
     return (
       <div className='container'>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>              
                <Link className="navbar-brand" to="#">My Sweet</Link>
              </div>
              
              <div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to="#">Home</Link></li>
                    {this.state.links.map(function(item){
                       return(<li>
                        <Link to={item.url}>{item.title}</Link>
                       </li>); 
                    })}
                    
                  </ul>
                </div>
              </div>
            </div>
          </nav>
         {this.props.children}
         <footer><div style={{"textAlign":"right"}}>KleeUT</div></footer>
       </div>
     );
   }
 });
