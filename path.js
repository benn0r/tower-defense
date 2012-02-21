/**
 * Pathfinder - Finds a path in a tiled world
 * 
 * Sample usage:
 * 	 var finder = new pathfinder();
 * 	 if (finder.find({x: 1, y: 4}, {x: 11, y: 13})) {
 * 	   console.log(finder.getPath());
 *   }
 *   
 * This pathfinder works as the code from http://www.tonypa.pri.ee/tbw/tut22.html
 * but is redesigned by me.
 * 
 * @copyright Copyright (c) 2012, benn0r <benjamin@benn0r.ch>
 * @version benn0r <benjamin@benn0r.ch>
 */
function pathfinder() {
	
	var _data = {
		unchecked: [], // unchecked tiles
		names: {}, // names of elements in unchecked
		path: {},
		result: [] // generated path to target
	};
	
	/**
	 * callback function for elements
	 * 
	 * @var function
	 */
	var _callback = null;
	
	/**
	 * set callback function for checking elements
	 * for beeing a walkable element
	 * 
	 * @param function
	 */
	this.callback = function(callback) {
		_callback = callback;
	};
	
	this._buildName = function(x, y) {
		return "node_" + x + "_" + y; // name in tiles array
	};
	
	/**
	 * reset data in object
	 */
	this.reset = function() {
		_data = {
			unchecked: [],
			names: {},
			path: {},
			result: []
		};
	};
	
	/**
	 * finds a path from start to target
	 * 
	 * @param object start {x: 1, y: 1}
	 * @param object target {x: 2, y: 2}
	 * @return boolean
	 */
	this.find = function(start, target) {
		var starter = {
				x: start.x, 
				y: start.y, 
				visited: true, 
				parentx: null, 
				parenty: null
		};
		
		var id = _data.unchecked.length; // next free slot in stack
		var name = this._buildName(starter.x, starter.y);
		
		// add startpoint to stack
		_data.path[name] = starter;
		_data.unchecked[id] = _data.path[name];
		_data.names[name] = id;
		
		while (_data.unchecked.length > 0) {
			var tile = _data.unchecked.shift();
			
			if (tile.x == target.x && tile.y == target.y) {
				// we found the target
				 _data.result = this._makePath(tile);
				return true;
			} else {
				tile.visited = true;
				
				// check all 4 neighbors of the tile and add them to the stack
				this._addNode(tile, tile.x + 1, tile.y);
				this._addNode(tile, tile.x - 1, tile.y);
				this._addNode(tile, tile.x, tile.y + 1);
				this._addNode(tile, tile.x, tile.y - 1);
			}
		}
		
		return false;
	};
	
	/**
	 * adds a tile to stack
	 * 
	 * @param object parent parent tile
	 * @param int x
	 * @param int y
	 */
	this._addNode = function(parent, x, y) {
		var id = this._buildName(x, y);
		
		// only add nodes we never added before
		if (((_callback && _callback(x, y)) || !_callback) && !_data.names[id] &&
				(!_data.path[id] || _data.path[id].visited != true)) {
			var tile = {
					x: x, 
					y: y, 
					visited: false, 
					parentx: parent.x,
					parenty: parent.y
			};
			
			var slot = _data.unchecked.length;
			
			// add tile to stack
			_data.path[id] = tile;
			_data.unchecked[slot] = _data.path[id];
			_data.names[id] = slot;
		}
	};
	
	/**
	 * builds the path after target was found
	 * 
	 * @return array
	 */
	this._makePath = function(tile) {
		var result = [];
		
		while (tile.parentx != null) {
			result[result.length] = {x: tile.x, y: tile.y};
			tile = _data.path[this._buildName(tile.parentx, tile.parenty)];
		}
		
		return result;
	};
	
	this.getPath = function() {
		return _data.result;
	};
	
}

//var pathObj = new path();
//pathObj.callback(function(x, y) {
//	if (x >= 0 && x < 16 && y >= 0 && y < 16) {
//		return true;
//	}
//	
//	return false;
//});
//
//pathObj.find({x: 1, y: 4}, {x: 11, y: 13});
//
//console.log(pathObj.getPath());