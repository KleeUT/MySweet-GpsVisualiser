'use strict'
module.exports = class{
	niceNameForId(id){
		var ids = {
			"259f4286255a3355":"Klee's Phone",
			"c880b271":"Klees phone (SER)",
		};
		
		return ids[id] || id;
	}
}