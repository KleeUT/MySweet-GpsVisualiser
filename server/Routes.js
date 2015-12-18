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
    //   [
    //     {"lat":33.808678, "long":-117.918921,"name":"Test 1"},
    //     {"lat":33.808333, "long":-117.918921,"name":"Test 1"},
    //   ]
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
      // var updatedCoordinate = {"lat":request.query.lat, "long":request.query.long,"name":request.query.id};
      // self.data[updatedCoordinate.name] = updatedCoordinate;
      // console.log(`${updatedCoordinate.lat}, ${updatedCoordinate.long}, ${updatedCoordinate.id} `)
      response.json({});
      // self.io.emit('UpdatePosition',{'lat':lat,"long":long,"name":name});
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
      // response.json([{"name":"c06bb203a0da4a17","lat":"-32.88687539606783","long":"151.689396260837","startTime":"2015-12-14T21:59:59.409Z","endTime":"2015-12-14T22:00:47.849Z"},{"name":"c06bb203a0da4a17","lat":"-32.886745790388126","long":"151.68944198808438","startTime":"2015-12-14T22:01:04.709Z","endTime":"2015-12-14T22:01:08.933Z"},{"name":"c06bb203a0da4a17","lat":"-32.88190555053697","long":"151.71887292131913","startTime":"2015-12-14T22:09:05.364Z","endTime":"2015-12-14T22:09:06.776Z"},{"name":"c06bb203a0da4a17","lat":"-32.881909347434046","long":"151.71887438621243","startTime":"2015-12-14T22:09:07.561Z","endTime":"2015-12-14T22:09:08.855Z"},{"name":"c06bb203a0da4a17","lat":"-32.88682547015907","long":"151.7208530615368","startTime":"2015-12-14T22:09:47.098Z","endTime":"2015-12-14T22:09:47.841Z"},{"name":"c06bb203a0da4a17","lat":"-32.88680239703516","long":"151.7208307281328","startTime":"2015-12-14T22:09:50.021Z","endTime":"2015-12-14T22:10:01.325Z"}]);
    });
    
    app.get('/api/config/mappedandunmappedids', function(request, response){
      response.json({mapped:self.config.allMappedIds(), unmapped:self.config.allUnmappedIds()});
    });
    
    app.post('/api/config/map', function(request, response){
      self.config.upsertMapping(request.body.key, request.body.value);
      self.io.emit('ConfigUpdated',{mapped:self.config.allMappedIds(), unmapped:self.config.allUnmappedIds()});
    });
    
    function updateLocation(lat, long, id, speed){
      var updatedCoordinate = {"lat":lat, "long":long,"id":id, "speed":speed};
      self.data[updatedCoordinate.name] = updatedCoordinate;
      console.log(`${updatedCoordinate.lat}, ${updatedCoordinate.long}, ${updatedCoordinate.name}, ${speed} `)
    }
  }
}
