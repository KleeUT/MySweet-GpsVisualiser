'use strict'
module.exports = class{
	constructor(){
		this.mappings = {
			"259f4286255a3355":"Klee's Phone",
			"c880b271":"Klees phone (SER)",
		};
		this.unmappedIds = new Set();
	}
	niceNameForId(id){
		return this.mappings[id] || id;
	}
	allMappedIds(){
		var self = this;
		var mapArr = [];
		for(var mapping in self.mappings){
			mapArr.push({key:mapping, value:self.mappings[mapping]})
		}
		return mapArr;
	}
	allUnmappedIds(){
		return this.unmappedIds;
	}
	upsertMapping(key, value){
		this.mappings[key] = value;
	}
	addIdIfUnmapped(id){
		if(this.mappings[id]){
			return;
		}
		this.unmappedIds.add(id);
	}
}