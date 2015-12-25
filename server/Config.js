'use strict'
module.exports = class{
	constructor(){
		this.mappings = {
			"259f4286255a3355":"Klee's Phone",
			"c880b271":"Klees phone (SER)",
		};
		this.unmappedIds = new Set();
		this.unmappedIds.add("1234567890");
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
		return Array.from(this.unmappedIds).map(function(item){
			return {key:item,value:undefined};
		})
	}
	upsertMapping(key, value){
		if(this.unmappedIds.has(key)){
			this.unmappedIds.delete(key);
		}
		
		this.mappings[key] = value;
	}
	addIdIfUnmapped(id, configUpdatedCallback){
		if(this.mappings[id]){
			return;
		}
		configUpdatedCallback(this.allMappedIds, this.allUnmappedIds);
		this.unmappedIds.add(id);
	}
}