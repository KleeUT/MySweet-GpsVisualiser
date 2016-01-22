'use strict'
module.exports = class{
	constructor(){
		this.inactivies = [];
		this.currentInactivies = {};
	}
	gpsInfoReceived(gpsPositionData){
		if(gpsPositionData.speed == 0){
			if(this.currentInactivies[gpsPositionData.id]){
				// Info: We've aready got an inactivy started for this exit early.
				return;
			}
			
			this.currentInactivies[gpsPositionData.id] = {
                id:gpsPositionData.id,
				lat:gpsPositionData.lat,
				long:gpsPositionData.long, 
				startTime: gpsPositionData.time}
		}
		else{
			if(!this.currentInactivies[gpsPositionData.id]){
				// Info: We dont have a started inactivity, normal case
				return;
			}
			
			var inactivity = this.currentInactivies[gpsPositionData.id]
			inactivity.endTime = gpsPositionData.time;
			this.currentInactivies[gpsPositionData.id] = undefined;
			this.inactivies.push(inactivity);
		}
	}
	getAllInactivities(){
        var inactivites = this.inactivies;
        
        for(var id in this.currentInactivies){
            var inactivity = this.currentInactivies[id];
            if(!(inactivity === undefined)){
                inactivites.push(inactivity);
            }
        }

		return inactivites;
	}
}