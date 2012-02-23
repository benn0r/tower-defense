window.onload = (function() {
    var WIDTH = 256 + 130;
    var HEIGHT = 256;
    
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
    
    Crafty.e("Map");
    
});