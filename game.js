window.onload = (function() {
    var WIDTH = 256;
    var HEIGHT = 256;
    
    Crafty.init(WIDTH, HEIGHT);
    
    Crafty.sprite(16, "terrain.png", {
        Grass: [0,0],
        Wall: [1,0],
        Castle: [2,0],
        DefaultMob: [3,0],
        DefaultTower: [4,0],
        Blood: [5,0]
    });
    
    Crafty.c("Mob", {
    	_treasure: {},
    	_dead: false,
    	
    	init: function() {
    		this.addComponent("2D, Canvas, DefaultMob");
    	},
    	
    	// called every round
    	turn: function() {
    		if (this._dead) {
    			// we are dead
    			return;
    		}
    		
    		// move to treasure with random speed
    		var x = Crafty.math.randomInt(0, 8);
    		var y = Crafty.math.randomInt(0, 8);
    		
    		if (this.x > this._treasure.x) {
    			this.x -= x;
    		} else {
    			this.x += x;
    		}
    		
    		if (this.y > this._treasure.y) {
    			this.y -= y;
    		} else {
    			this.y += y;
    		}
       	},
    	
    	treasure: function(x, y) {
    		this._treasure = {x: x, y: y};
    	}
    });
    
    Crafty.c("Tower", {
    	_radius: null,
    	
    	init: function() {
    		this.addComponent("2D, Canvas, DefaultTower");
    	},
    	
    	// called every round
    	turn: function(mobs) {
    		
    		var limit = 2; // max kills per round
    		var kills = 0;
    		
    		if (!this._radius) {
    			// radius for canon
    			this._radius = new Crafty.circle(this.x, this.y, 60);
    		}
    		
    		for (var i = 0; i < mobs.length; i++) {
    			if (kills >= limit) {
    				// reached kill limit
    				return;
    			}
    			
    			if (!mobs[i]._dead &&
    					this._radius.containsPoint(mobs[i].x, mobs[i].y)) {
    				
    				// we killed the mob
    				mobs[i].addComponent("Blood");
    				mobs[i].removeComponent("DefaultMob");
    				mobs[i]._dead = true;
    				kills++;
    			}
    		}
       	}
    });
    
    // grass floor
    for (var i = 0; i < WIDTH / 16; i++) {
    	for (var j = 0; j < HEIGHT / 16; j++) {
    		Crafty.e("2D, Canvas, Grass").attr({x: i * 16, y: j * 16});
        }
    }
    
    // walls top and bottom
    for (var i = 0; i < WIDTH / 16; i++) {
    	Crafty.e("2D, Canvas, Wall").attr({x: i * 16, y: 0});
    	
    	if (i < 10 || i > 12) {
    		Crafty.e("2D, Canvas, Wall").attr({x: i * 16, y: HEIGHT - 16});
    	}
    }
    
    // walls left and right
    for (var i = 0; i < WIDTH / 16; i++) {
    	Crafty.e("2D, Canvas, Wall").attr({x: 0, y: i * 16});
    	
    	if (i < 10 || i > 12) {
    		Crafty.e("2D, Canvas, Wall").attr({x: WIDTH - 16, y: i * 16});
    	}
    }
    
    // treasure for mobs
    Crafty.e("2D, Canvas, Castle").attr({x: 16 * 2, y: 16 * 2});
    
    // test towers
    var tower1 = Crafty.e("2D, Canvas, Tower").attr({x: 16 * 5, y: 16 * 5});
//    var tower2 = Crafty.e("2D, Canvas, Tower").attr({x: 16 * 5, y: 16 * 6});
//    var tower3 = Crafty.e("2D, Canvas, Tower").attr({x: 16 * 5, y: 16 * 7});
    
    var mobs = new Array();
    
    /**
     * Generate mobs on the spawnpoints
     */
    function spawn() {
    	for (var i = 0; i < 10; i++) {
        	var mob = Crafty.e("2D, Canvas, Mob").attr({x: WIDTH - 6 * 16 + Crafty.math.randomInt(0, 32), y: HEIGHT - 16});
        	mob.treasure(16 * 2, 16 * 2);
        	
        	mobs.push(mob);
        	
        	var mob = Crafty.e("2D, Canvas, Mob").attr({x: WIDTH - 16, y: HEIGHT - 6 * 16 + Crafty.math.randomInt(0, 32)});
        	mob.treasure(16 * 2, 16 * 2);
        	
        	mobs.push(mob);
    	}
    };
       
    
    // calls the turn method of all units on the map
    setInterval(function() {
    	for (var i = 0; i < mobs.length; i++) {
    		mobs[i].turn();
    	}
    	
    	tower1.turn(mobs);
//    	tower2.turn(mobs);
//    	tower3.turn(mobs);
    }, 100);
    
    // start with spawning
    setTimeout(function() {
    	spawn();
    }, 1000);
    
});