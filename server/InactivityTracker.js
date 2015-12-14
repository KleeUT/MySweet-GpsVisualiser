'use strict'
module.exports = class{
	constructor(){
		this.inactivies = [];
		this.currentInactivies = {};
	}
	gpsInfoReceived(gpsPositionData){
		if(gpsPositionData.speed == 0){
			console.log(`stopped for ${gpsPositionData.id}`);
			if(this.currentInactivies[gpsPositionData.name]){
				// Info: We've aready got an inactivy started for this exit early.
				return;
			}
			
			this.currentInactivies[gpsPositionData.name] = {name: gpsPositionData.name, startTime: new Date()}

		}
		else{
			console.log(`moving for ${gpsPositionData.id}`);
			if(!this.currentInactivies[gpsPositionData.name]){
				
				// Info: We dont have a started inactivity, normal case
				return;
			}
			
			var inactivity = this.currentInactivies[gpsPositionData.name]
			inactivity.endTime = new Date();
			this.currentInactivies[gpsPositionData.name] = undefined;
			this.inactivies.push(inactivity);
			console.log(`inactivites are ${JSON.stringify(this.inactivies)}`);
		}
	}
	getAllInactivities(){
		return this.inactivies;
	}
}