'use strict'
var Config = require('./Config.js');
var InactivityTracker = require('./InactivityTracker.js');

module.exports = class{
  constructor(app, io){
    this.app = app;
    this.data = {};
    this.io = io;
    this.config = new Config();
    this.inactivityTracker = new InactivityTracker();
  }
  
  initializeRoutes(){
    var self = this;
    var app = self.app;
    self.io.on('connection', function(socket){
      console.log('connection established');
    });
    
    app.get('/api/topLevelLinks', function(request, response){
      var links = [
        {url:"/Map", title:"Map"},
        {url:"/LoctionSubmit", title:"Location Submit"},
        {url:"/Inactivity", title:"Inactivity Tracker"},
        {url:"/Config", title:"Config"},
      ]
      response.json({links:links});
    });
    
    app.get('/api/locations', function(request, response){
      var arr = [];
      for(var p in self.data){
        p.name = self.config.niceNameForId(data.name);
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

      response.json({});
      self.io.emit('UpdatePosition',{'lat':lat,"long":long,"name":name});
    });
    
    app.get('/api/raw', function(request, response){
      var data = request.query;
      
      var lat = data.lat;
      var long = data.long;
      var id = data.name;
      var name = self.config.niceNameForId(data.name);
      var speed = data.s;
      
      updateLocation(lat, long, id, speed);
      self.inactivityTracker.gpsInfoReceived({
        id:id,
        lat:lat,
        long:long,
        speed:speed
      })      

      response.json({});
      self.io.emit('UpdatePosition',{'lat':lat,"long":long,"name":name, "speed":speed});
      
      self.config.addIdIfUnmapped(id, function(mapped, unmapped){
        self.io.emit('ConfigUpdated',{mapped:mapped, unmapped:unmapped});
      });
    });
    
    app.get('/api/allInactivity', function(request, response){
      response.json(self.inactivityTracker.getAllInactivities().map(function(item){
        item.name = self.config.niceNameForId(item.id);
        return item;
      }));
    });
    
    app.get('/api/config/mappedandunmappedids', function(request, response){
      response.json({mapped:self.config.allMappedIds(), unmapped:self.config.allUnmappedIds()});
    });
    
    app.post('/api/config/map', function(request, response){
      self.config.upsertMapping(request.body.key, request.body.value);
      self.io.emit('ConfigUpdated',{mapped:self.config.allMappedIds(), unmapped:self.config.allUnmappedIds()});
      response.json({});
    });
    
    function updateLocation(lat, long, id, speed){
      var updatedCoordinate = {"lat":lat, "long":long,"id":id, "speed":speed};
      self.data[updatedCoordinate.name] = updatedCoordinate;
      console.log(`${updatedCoordinate.lat}, ${updatedCoordinate.long}, ${updatedCoordinate.name}, ${speed} `)
    }
  }
}
