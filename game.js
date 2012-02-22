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
    	Zombie: [3,0]
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
    
//    Crafty.c("Box", {
//    	wall: false,
//    	
//    	_draw: function(ctx, po) {
//    		var pos = {_x: po._x + 1, _y: po._y + 1, _w: po._w - 2, _h: po._h -2};
//    		
//    		var x = Math.round(pos._x / 16);
//    		var y = Math.round(pos._y / 16);
//    		
//    		if (x == TARGET.x && y == TARGET.y) {
//    			ctx.fillStyle = "#ff0000";
//    		} else if(this.wall) {
//    			ctx.fillStyle = "#000000";
//    			//this.val = 0; //	 u can't walk there
//    		} else {
//    			ctx.fillStyle = "#ffffff";
//    		}
//    		
//            ctx.fillRect(pos._x, pos._y, pos._w, pos._h);
//            
//            ctx.fillStyle = "#1064C2";
//    	},
//    	init: function() {
//    		this.addComponent("2D, Canvas, Color, Tween, Mouse");
//    		
//    		this.w = 16;
//    		this.h = 16;
//    		
//    		this.bind("Draw", function(obj) {
//                this._draw(obj.ctx, obj.pos);
//            });
//    		
//    		this.bind("Click", function(e) {
//    			if (pos.path.length == 0) {
//	    			finder.reset();
//	    			
//	    			var last = {x: Math.round(pos.x / 16), y: Math.round(pos.y / 16)};
//	    			
//	    			finder.find({x: last.x, y: last.y}, {x: Math.round(this.x / 16), y: Math.round(this.y / 16)});
//	    			var bla = finder.getPath();
//	    			
//	    			pos.path = bla;
//    			}
//            });
//    	}
//    });
    
//    Crafty.c("Path", {
//    	path: [],
//    	_wp: null,
//    	
//    	_draw: function(ctx, po) {
//    		var pos = {_x: po._x + 1, _y: po._y + 1, _w: po._w - 2, _h: po._h -2};
//    		
//    		ctx.fillStyle = "#666666";
//            ctx.fillRect(pos._x, pos._y, pos._w, pos._h);
//    	},
//    	init: function() {
//    		this.addComponent("2D, Canvas, Color, Tween");
//    		
//    		this.w = 16;
//    		this.h = 16;
//    		
//    		this.bind("Draw", function(obj) {
//                this._draw(obj.ctx, obj.pos);
//            });
//    		
//    		this.bind("EnterFrame", function() {
//    			
//    			if (this.path.length > 0 && _wp == null) {
//    				_wp = this.path.pop();
//    				
//    				_wp.x = _wp.x * 16;
//    				_wp.y = _wp.y * 16;
//    			}
//    			
//    			var x = this.x;
//    			var y = this.y;
//    			
//    			if (_wp && (_wp.x != x || _wp.y != y)) {
//    				if (_wp.x != x) {
//    					this.x = (_wp.x < x) ? this.x - 8 : this.x + 8;
//    				} 
//    				if (_wp.y != y) {
//    					this.y = (_wp.y < y) ? this.y - 8 : this.y + 8;
//    				}
//    			} else {
//    				_wp = null;
//    			}
//    		});
//    	}
//    });
    
//    for (var i = 0; i < WIDTH / 16; i++) {
//    	for (var j = 0; j < HEIGHT / 16; j++) {
//    		var box = Crafty.e("Box").attr({x: i * 16, y: j * 16}).color("#000000");
//    		
//    		var x = Math.round(box.x / 16);
//    		var y = Math.round(box.y / 16);
//    		
//    		if ((y == 3 && x > 4 && x < 17) || 
//    				(x == 12 && y > 3 && y < 15) ||
//    				(x == 3 && y > 4 && y < 9) ||
//    				(x == 6 && y > 0 && y < 6) ||
//    				(x == 8 && y > 4 && y < 8) ||
//    				(x == 8 && y > 4 && y < 8) ||
//    				(y == 10 && x > 2 && x < 12) ||
//    				(y == 7 && x >= 0 && x < 11)) {
//    			box.wall = true;
//    		}
//    		
//    		if (!map[x]) {
//    			map[x] = new Array();
//    		}
//    		
//    		map[x][y] = box;
//        }
//    }
    
    var target = null;
    
    for (var y = 0; y < _map.length; y++) {
    	for (var x = 0; x < _map[y].length; x++) {
    		if (_map[y][x] == "Target") {
    			target = {x: x, y: y};
    		}
    		
    		Crafty.e("Terrain, " + _map[y][x]).attr({x: x * 16, y: y * 16});
    	};
    };
    
    setInterval(function() {
	    var paths = [];
	    var mobs = [];

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
	    
	    
	    for (var i = 0; i < mobs.length; i++) {
	    	mobs[i].setPath(paths[mobs[i].spawn]);
	    }
    }, 1000);
    
    
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