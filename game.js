window.onload = (function() {
    var WIDTH = 256;
    var HEIGHT = 256;
    
    var TARGET = {x: 8, y: 11};
    var START = {x: 10, y: 11};
    
    var _map = [
       	["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Target", "Wall", "Grass", "Wall", "Grass", "Wall", "Grass", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall"],
    	["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Grass", "Wall"],
    	["Wall", "Wall", "Wall", "Wall", "Grass", "Wall", "Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Wall", "Wall"],
    	["Wall", "Grass", "Wall", "Wall", "Wall", "Wall", "Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall", "Grass", "Grass", "Grass", "Wall", "Wall"],
    	["Wall", "Grass", "Grass", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall"],
    	["Wall", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Wall", "Wall"],
    	["Wall", "Wall", "Wall", "Wall", "Wall", "Grass", "Grass", "Grass", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ];
    var _spawns = [
                   {x: 5, y: 15}, 
                   {x: 15, y: 1}, 
                   {x: 14, y: 13}
                  ];
    
    function _randSpawn() {
    	return Crafty.math.randomInt(0, _spawns.length - 1);
    };
    
    Crafty.init(WIDTH, HEIGHT);
    
    Crafty.sprite(16, "terrain.png", {
    	Grass: [0,0],
    	Wall: [1,0],
    	Target: [2,0],
    	Zombie: [3,0],
    	Defaulttower: [4,0],
    	Blood: [5,0]
    });
    
    Crafty.c("Terrain", {
    	init: function() {
    		this.addComponent("2D, Canvas");
    		
    		this.w = 16;
    		this.h = 16;
    	},
    });
    
    Crafty.c("Mob", {
    	_target: null,
    	_path: [],
    	_wp: null,
    	killed: false,
    	
    	setTarget: function(target) {
    		_target = target;
    	},
    	setPath: function(path) {
    		this._path = path;
    	},
    	
    	init: function() {
    		this.addComponent("2D, Canvas");
    		
    		this.w = 16;
    		this.h = 16;
    		
    		this.bind("EnterFrame", function() {
    			if (this.killed) {
    				return;
    			}
    			
    			if (this._path.length > 0 && this._wp == null) {
    				this._wp = this._path.pop();
    				
    				this._wp.x = this._wp.x * 16;
    				this._wp.y = this._wp.y * 16;
    			}
    			
    			var x = this.x;
    			var y = this.y;
    			
    			if (this._wp && (this._wp.x != x || this._wp.y != y)) {
    				if (this._wp.x != x) {
    					this.x = (this._wp.x < x) ? this.x - 1 : this.x + 1;
    				} 
    				if (this._wp.y != y) {
    					this.y = (this._wp.y < y) ? this.y - 1 : this.y + 1;
    				}
    			} else {
    				this._wp = null;
    			}
    		});
    	}
    });
    
    Crafty.c("Tower", {
    	_radius: null,
    	_frame: 0,
    	
    	init: function() {
    		this.addComponent("2D, Canvas, Defaulttower");
    		
    		this.bind("EnterFrame", function() {
    			this._frame++;
    			
    			if (this._frame % 60 != 0) {
    				return;
    			}
    			
    			var limit = 1;
        		var kills = 0;
        		
        		if (!this._radius) {
        			this._radius = new Crafty.circle(this.x, this.y, 40);
        		}
        		
        		for (var i = 0; i < mobs.length; i++) {
        			if (kills >= limit) {
        				return;
        			}
        			
        			if (mobs[i].killed == false &&
        					this._radius.containsPoint(mobs[i].x, mobs[i].y)) {
        				console.log("kill");
        				mobs[i].killed = true;
        				mobs[i].removeComponent("Zombie");
        				mobs[i].addComponent("Blood");
        				kills++;
        			}
        		}
    		});
    	},
    });
    
    var target = null;
    
    for (var y = 0; y < _map.length; y++) {
    	for (var x = 0; x < _map[y].length; x++) {
    		if (_map[y][x] == "Target") {
    			target = {x: x, y: y};
    		}
    		
    		Crafty.e("Terrain, " + _map[y][x]).attr({x: x * 16, y: y * 16});
    	};
    };
    
    var mobs = [];
    
    setInterval(function() {
	    var paths = [];
	    var mobsstart = mobs.length;

	    for (var mSpawn = 0; mSpawn < _spawns.length; mSpawn++) {
	    	var zombie = Crafty.e("Mob, Zombie").attr({x: _spawns[mSpawn].x * 16, y: _spawns[mSpawn].y * 16});
	        zombie.setTarget(target);
	        zombie.spawn = mSpawn;
	        
	        mobs[mobs.length] = zombie;
	    }
	    
	    var finder = new pathfinder();
	    finder.callback(function(x, y) {
	    	if (_map[y] && _map[y][x] != "Wall") {
	    		return true;
	    	}
	    	
	    	return false;
	    });
	    
	    for (var i = 0; i < _spawns.length; i++) {
	    	finder.reset();
	    	finder.find(_spawns[i], target);
	    	paths[i] = finder.getPath();
	    }
	    
	    
	    for (var i = mobsstart; i < mobs.length; i++) {
	    	mobs[i].setPath(paths[mobs[i].spawn]);
	    }
    }, 1000);
    
    Crafty.e("Tower").attr({x: 4 * 16, y: 4 * 16});
    Crafty.e("Tower").attr({x: 8 * 16, y: 4 * 16});
    Crafty.e("Tower").attr({x: 7 * 16, y: 6 * 16});
    Crafty.e("Tower").attr({x: 12 * 16, y: 6 * 16});
    Crafty.e("Tower").attr({x: 12 * 16, y: 4 * 16});
    Crafty.e("Tower").attr({x: 9 * 16, y: 2 * 16});
    
    
//    var tar = Crafty.e("Box").attr({x: TARGET.x * 16, y: TARGET.y * 16}).color("#000000");
//    var pos = Crafty.e("Path").attr({x: START.x * 16, y: START.y * 16}).color("#000000");
//    pos.val = 0;
//    
//    var tarp = {x: Math.round(tar.x / 16), y: Math.round(tar.y / 16)};
//	var posp = {x: Math.round(pos.x / 16), y: Math.round(pos.y / 16)};
//	
//	var finder = new pathfinder();
//	finder.callback(function(x, y) {
//		if(map[x] && map[x][y] && !map[x][y].wall) {
//			return true;
//		}
//		
//		return false;
//	});
//	
//	finder.find({x: posp.x, y: posp.y}, {x: tarp.x, y: tarp.y});
//	var path = finder.getPath();
//	pos.path = path;
    
});