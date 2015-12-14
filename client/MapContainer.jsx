var React = require('react');
module.exports = React.createClass({
  componentDidMount(){
  /*
  * declare map as a global variable
  */
  var map;
  console.log("Mounted map");
  /*
  * use google maps api built-in mechanism to attach dom events
  */
  google.maps.event.addDomListener(window, "load", function () {
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
   $.ajax({url:"/api/locations",
     success:function(data){
       console.log('successful data returned ' + data);
      //  thisReact.setState({projects:data});
      data.forEach((item) => {
        console.log(`adding marker ${item.name} - ${item.lat}, ${item.long}`)
        var marker = createMarker({
          position: new google.maps.LatLng(item.lat, item.long),
          title:item.name,
          map: map,
          // icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
        }, item.name);
        markers[item.name] = marker;
      })
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
          // icon: "http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
        }, `<h1>${updatedData.name}</h1><p>${updatedData.lat} - ${updatedData.long}</p>`);
      }
    };
  
  
  socket.on('UpdatePosition', function(msg){
    console.log(msg);
    ioMessageHandlers['UpdatePosition'](msg);
  });   

  });
  },
  render(){
    return(
      <div className='row'>
        <h2>Gps Visualiser</h2>
        <div id="map_div" style={{height:400}}></div>
      </div>
    );
  }
});
