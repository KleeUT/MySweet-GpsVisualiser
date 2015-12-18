var DetailsDisplay = React.createClass({
  render(){
    return (
      <div className="well">
        <h3>{this.props.name}</h3>
        Latitude: {this.props.lat} <br />
        Longitude: {this.props.long} <br />
        Speed: {this.props.speed} <br />
      </div>
    );
  }
})

var MapContainer = React.createClass({
  getInitialState(){
    return {points:[]}
  },
  componentDidMount(){
  var self = this;
  /*
  * declare map as a global variable
  */
  var map;
  console.log("Mounted map");
  /*
  * use google maps api built-in mechanism to attach dom events
  */
  // google.maps.event.addDomListener(window, "load", function () {
  console.log("Dom Load");

  /*
   * create map
   */
   var work = new google.maps.LatLng(-32.888395, 151.718015);
   var home = new google.maps.LatLng(-32.8821982, 151.6631111);
  var map = new google.maps.Map(document.getElementById("map_div"), {
    center: work,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  /*
   * create infowindow (which will be used by markers)
   */
  var infoWindow = new google.maps.InfoWindow();

  /*
   * marker creater function (acts as a closure for html parameter)
   */
  function createMarker(options, html) {
    var marker = new google.maps.Marker(options);
    if (html) {
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(html);
        infoWindow.open(options.map, this);
      });
    }
    return marker;
  }

  /*
   * add markers to map
   */
   var markers = {};
   var gopng = "/go.png";
   var stoppng = "/stop.png";
   $.ajax({url:"/api/locations",
     success:function(data){
       var points = [];
       console.log('successful data returned ' + data);
      //  thisReact.setState({projects:data});
      for(var i = 0; i<data.length; i++){
        var item = data[i];
        console.log(`adding marker ${item.name} - ${item.lat}, ${item.long} ${item.speed}`)
        var icon = item.speed == 0.0 ? stoppng : gopng;
        var marker = createMarker({
          position: new google.maps.LatLng(item.lat, item.long),
          title:item.name,
          icon: item.speed == 0.0 ? stoppng : gopng,
          map: map,
          // icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
        },
        `<h1>${item.name}</h1><p>Lat: ${item.lat} Long: ${item.long}</p><p>Speed:${item.speed}</p>`);
        markers[item.name] = marker;
        item["key"] = item.name;
        points.push(item);
      }
      console.log(`Points Count ${points.count} - [${points}]`)
      self.setState({points:points});
      // data.forEach((item) => {
        
      // })
     },
     error:function(error){
       console.log('unsuccessful data returned ' + error);
      //  thisReact.setState({error:error});
     }
   });
   
  var socket = io();
  
  var ioMessageHandlers = {
    "UpdatePosition":(updatedData) => {
      if(markers[updatedData.name]){
        console.log(`found marker for name ${updatedData.name}`);
        markers[updatedData.name].setMap(null)
      }
      
        markers[updatedData.name] = createMarker({
          position: new google.maps.LatLng(updatedData.lat, updatedData.long),
          title:updatedData.name,
          map: map,
          icon: updatedData.speed == 0.0 ? stoppng : gopng
        }, `<h1>${updatedData.name}</h1><p>Lat: ${updatedData.lat} Long: ${updatedData.long}</p><p>Speed:${updatedData.speed}</p>`);
      }
    };
  
  
  socket.on('UpdatePosition', function(msg){
    console.log(msg);
    ioMessageHandlers['UpdatePosition'](msg);
  });   

  // });
  },
  render(){
    return(
      <div className='row'>
        <h2>Gps Visualiser</h2>
        <div id="map_div" style={{height:600}} className='col-sm-12 col-md-9'></div>
        <div className='col-sm-12 col-md-3'>
              {this.state.points.map(item => {
                console.log('point');
                console.log(item);
                return(
                  <DetailsDisplay name={item.name} lat={item.lat} long={item.long} speed={item.speed} />
                )
              })}
            
        </div>
      </div>
    );
  }
});
module.exports = MapContainer;