function path() {
	
	var _data = {
		unchecked: [], // unchecked tiles
		names: {}, // name to find tile in array with unchecked tiles
		done: false,
		path: [],
		result: []
	};
	
	var _callback = null;
	
	this.callback = function(callback) {
		_callback = callback;
	}
	
	this._buildName = function(x, y) {
		return "node_" + x + "_" + y; // name in tiles array
	};
	
	this._nextId = function() {
		return _data.unchecked.length;
	};
	
	this.find = function(start, target) {
		var starter = {
				x: start.x, 
				y: start.y, 
				visited: true, 
				parentx: null, 
				parenty: null
		};
		
		var id = this._nextId(); // next free slot in stack
		
		// add startpoint to stack
		_data.names[this._buildName(starter.x, starter.y)] = _data.path.length;
		_data.unchecked[id] = starter;
		_data.path[_data.path.length] = starter;
		
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
	
	this._addNode = function(parent, x, y) {
		var id = this._buildName(x, y);
		
		// only add nodes we never added before
		if (_callback && _callback(x, y) && !_data.names[id] &&
				(!_data.path[id] || _data.path[id].visited != true)) {
			var tile = {
					x: x, 
					y: y, 
					visited: false, 
					parentx: parent.x, 
					parenty: parent.y
			};
			
			// add tile to stack
			_data.names[id] = _data.path.length;
			_data.unchecked[this._nextId()] = tile;
			_data.path[_data.path.length] = tile;
		}
	};
	
	this._makePath = function(tile) {
		var result = [];
		
		while (tile.x != _data.path[0].x || tile.y != _data.path[0].y) {
			result[result.length] = {x: tile.x, y: tile.y};
			tile = _data.path[_data.names[this._buildName(tile.parentx, tile.parenty)]];
		}
		
		return result;
	};
	
	this.getPath = function() {
		return _data.result;
	};
	
}

var pathObj = new path();
pathObj.callback(function(x, y) {
	if (x >= 0 && x < 16 && y >= 0 && y < 16) {
		return true;
	}
	
	return false;
});

pathObj.find({x: 1, y: 4}, {x: 11, y: 13});
console.log(pathObj.getPath());