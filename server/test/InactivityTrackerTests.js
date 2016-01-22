  var assert = require('chai').assert;
  var expect = require('chai').expect;
  var InactivityTracker = require('../InactivityTracker.js');
  
  const timeIWroteThis = new Date(2016,1,14,21,50,0,0,0);
  const aBitLaterThanThat = new Date(2016,1,14,22,5,0,0,0);
  
  describe('Inactivity Tracker', function(){
    it('Moving GPS position does not start an inactivity', function(){
        var tracker = new InactivityTracker();
        var gpsPositionData = {
        id:"id1",
        lat:100,
        long:333,
        speed:50
      };
      tracker.gpsInfoReceived(gpsPositionData);
      var allInactivities = tracker.getAllInactivities();
      expect(allInactivities).to.be.empty;
    });
        
    it('Stopped GPS Position starts an inactivity', () => {
        var tracker = new InactivityTracker();
        var gpsPositionData = {
        id:"id1",
        lat:100,
        long:333,
        speed:0,
        time: timeIWroteThis
      };
      
      tracker.gpsInfoReceived(gpsPositionData);
      var allInactivities = tracker.getAllInactivities();
      expect(allInactivities).to.deep.equal([{
                id:"id1",
				lat:100,
				long:333, 
				startTime: timeIWroteThis
      }]);
    })
    
    it("Moving GPS position completes inactivity", () => {
        var tracker = new InactivityTracker();
        var gpsPositionData = {
        id:"id1",
        lat:100,
        long:333,
        speed:0,
        time: timeIWroteThis
      };
      
      var gpsPositionData2 = {
        id:"id1",
        lat:100,
        long:333,
        speed:10,
        time: aBitLaterThanThat
      };
      
      tracker.gpsInfoReceived(gpsPositionData);
      tracker.gpsInfoReceived(gpsPositionData2);
      var allInactivities = tracker.getAllInactivities();
      expect(allInactivities).to.deep.equal([{
                id:"id1",
				lat:100,
				long:333, 
				startTime: timeIWroteThis,
                endTime: aBitLaterThanThat
      }]);
    })
    
    it("Moving without recoreded stop does not record inactivity", () => {
      var tracker = new InactivityTracker();
      var gpsPositionData2 = {
        id:"id1",
        lat:100,
        long:333,
        speed:10,
        time: aBitLaterThanThat
      };
      
      tracker.gpsInfoReceived(gpsPositionData2);
      var allInactivities = tracker.getAllInactivities();
      expect(allInactivities).to.deep.equal([]);  
    });
  });
