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
});

var MapContainer = React.createClass({
  getInitialState(){
    return {points:[]}
  },
  componentDidMount(){
    var self = this;
    var map;
    var MinLog = new google.maps.LatLng(-32.888395, 151.718015);
    var map = new google.maps.Map(document.getElementById("map_div"), {
      center: MinLog,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    var infoWindow = new google.maps.InfoWindow();
    function createMarker(details) {
      var options = {
            position: new google.maps.LatLng(details.lat, details.long),
            title:details.name,
            icon: details.speed == 0.0 ? "/stop.png" : "/go.png",
            map: map,
          };
      var html = `<h1>${details.name}</h1><p>Lat: ${details.lat} Long: ${details.long}</p><p>Speed:${details.speed}</p>`
      var marker = new google.maps.Marker(options);
      if (html) {
        google.maps.event.addListener(marker, "click", function () {
          infoWindow.setContent(html);
          infoWindow.open(options.map, this);
        });
      }
      return marker;
   }

   var markers = {};
   $.ajax({url:"/api/locations",
     success:function(data){
       var points = [];
       console.log('successful data returned ' + data);
       for(var i = 0; i<data.length; i++){
         var locationDetails = data[i];
       
         console.log(`adding marker ${locationDetails.name} - ${locationDetails.lat}, ${locationDetails.long} ${locationDetails.speed}`)
         var marker = createMarker(locationDetails);
         markers[locationDetails.name] = marker;
         locationDetails["key"] = locationDetails.name;
         points.push(locationDetails);
       }
      
      console.log(`Points Count ${points.count} - [${points}]`)
      self.setState({points:points});
     },
     error:function(error){
       console.log('unsuccessful data returned ' + error);
     }
    });
   
  var socket = io();
  
  var ioMessageHandlers = {
    "UpdatePosition":(updatedData) => {
        if(markers[updatedData.name]){
          console.log(`found marker for name ${updatedData.name}`);
          markers[updatedData.name].setMap(null)
        }
        
        markers[updatedData.name] = createMarker(updatedData);
      }
    };
  
  
  socket.on('UpdatePosition', function(msg){
    console.log(msg);
    ioMessageHandlers['UpdatePosition'](msg);
  });   
  },
  render(){
    return(
      <div className='row'>
        <h2>Gps Visualiser</h2>
        <div id="map_div" style={{height:600}} className='col-sm-12 col-md-9'></div>
        <div className='col-sm-12 col-md-3'>
              {this.state.points.map(locationDetails => {
                console.log('point');
                console.log(locationDetails);
                return(
                  <DetailsDisplay name={locationDetails.name} lat={locationDetails.lat} long={locationDetails.long} speed={locationDetails.speed} />
                )
              })}
            
        </div>
      </div>
    );
  }
});

module.exports = MapContainer;