var assert = require('chai').assert;
var expect = require('chai').expect;
var Routes = require('../Routes.js');
describe('test', function(){
    const timeIWroteThis = new Date(2016, 1, 17, 18, 11)
  it('that tests tests running', function(){
    var fakeApp = {
        gets:{},
        posts:{},
        get:function(path, callback){
            this.gets[path] = callback;
        },
        post:function(path, callback){
            this.posts[path] = callback;
        }
    };
    var fakeIo = {
        on:function(){},
        emit:function(){}
    };
    var config = {
        niceNameForId:function(id){
            return "someName"
        },
        addIdIfUnmapped:function(){}
    };
    var routes = new Routes(fakeApp, fakeIo, config); // used to initialize app
    routes.initializeRoutes();
    var request = {
        query:{
            lat:300,
            long:321,
            name:"SomeID",
            time: timeIWroteThis,
            s:0
        }
    };

    fakeApp.gets['/api/raw'](request, {json:()=>{}});
    
    var assertResponse = {
        json:function(data){
            
            expect(data).to.deep.equal([{
                id:"SomeID",
                name:"someName",
				lat:300,
				long:321, 
				startTime: timeIWroteThis
      }]);
        }
    };    

    fakeApp.gets['/api/allInactivity']({}, assertResponse)
  });
});
