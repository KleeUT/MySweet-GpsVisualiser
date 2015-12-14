'use strict'
var Config = require('./Config.js');

module.exports = class{
  constructor(app, io){
    this.app = app;
    this.data = {};
    this.io = io;
    this.config = new Config();
  }
  initializeRoutes(){
    var self = this;
    var app = self.app;
    self.io.on('connection', function(socket){
      console.log('connection established');
    });
    //   [
    //     {"lat":33.808678, "long":-117.918921,"name":"Test 1"},
    //     {"lat":33.808333, "long":-117.918921,"name":"Test 1"},
    //   ]
    app.get('/api/locations', function(request, response){
      var arr = [];
      for(var p in self.data){
        arr.push(self.data[p]);
      }
      response.json(arr);
    });
    
    app.post('/api/location', function(request, response){
      console.log(`receved a message ${request.body}`);
      var data = JSON.parse(request.body.data);
      var lat = data.lat;
      var long = data.long;
      var name = data.ser;
      
      updateLocation(lat, long, name);
      
      // var updatedCoordinate = {"lat":lat, "long":long,"name":name};
      // self.data[updatedCoordinate.name] = updatedCoordinate;
      // console.log(`${updatedCoordinate.lat}, ${updatedCoordinate.long}, ${updatedCoordinate.name} `)
      response.json({});
      self.io.emit('UpdatePosition',{'lat':lat,"long":long,"name":name});
    });
    
    app.get('/api/raw', function(request, response){
      // var data = request.body;
      var data = request.query;
      
      var lat = data.lat;
      var long = data.long;
      var name = self.config.niceNameForId(data.name);
      var speed = data.s;
      
      updateLocation(lat, long, name, speed);
      
      // var updatedCoordinate = {"lat":request.query.lat, "long":request.query.long,"name":request.query.id};
      // self.data[updatedCoordinate.name] = updatedCoordinate;
      // console.log(`${updatedCoordinate.lat}, ${updatedCoordinate.long}, ${updatedCoordinate.id} `)
      response.json({});
      // self.io.emit('UpdatePosition',{'lat':lat,"long":long,"name":name});
      self.io.emit('UpdatePosition',{'lat':lat,"long":long,"name":name, "speed":speed});
    })
    
    function updateLocation(lat, long, name, speed){
      var updatedCoordinate = {"lat":lat, "long":long,"name":name, "speed":speed};
      self.data[updatedCoordinate.name] = updatedCoordinate;
      console.log(`${updatedCoordinate.lat}, ${updatedCoordinate.long}, ${updatedCoordinate.name}, ${speed} `)
    }
  }
}
