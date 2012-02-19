window.onload = (function() {
    var WIDTH = 256;
    var HEIGHT = 256;
    
    var TARGET = {x: 9, y: 1};
    var START = {x: 10, y: 11};
    
    var map = new Array();
    
    Crafty.init(WIDTH, HEIGHT);
    
    Crafty.c("Box", {
    	wall: false,
    	
    	_draw: function(ctx, po) {
    		var pos = {_x: po._x + 1, _y: po._y + 1, _w: po._w - 2, _h: po._h -2};
    		
    		var x = Math.round(pos._x / 16);
    		var y = Math.round(pos._y / 16);
    		
    		if (x == TARGET.x && y == TARGET.y) {
    			ctx.fillStyle = "#ff0000";
    		} else if(this.wall) {
    			ctx.fillStyle = "#000000";
    			//this.val = 0; //	 u can't walk there
    		} else {
    			ctx.fillStyle = "#ffffff";
    		}
    		
            ctx.fillRect(pos._x, pos._y, pos._w, pos._h);
            
            ctx.fillStyle = "#1064C2";
    	},
    	init: function() {
    		this.addComponent("2D, Canvas, Color, Tween");
    		
    		this.w = 16;
    		this.h = 16;
    		
    		this.bind("Draw", function(obj) {
                this._draw(obj.ctx, obj.pos);
            });
    	}
    });
    
    Crafty.c("Path", {
    	_draw: function(ctx, po) {
    		var pos = {_x: po._x + 1, _y: po._y + 1, _w: po._w - 2, _h: po._h -2};
    		
    		ctx.fillStyle = "#666666";
            ctx.fillRect(pos._x, pos._y, pos._w, pos._h);
    	},
    	init: function() {
    		this.addComponent("2D, Canvas, Color, Tween");
    		
    		this.w = 16;
    		this.h = 16;
    		
    		this.bind("Draw", function(obj) {
                this._draw(obj.ctx, obj.pos);
            });
    	}
    });
    
    for (var i = 0; i < WIDTH / 16; i++) {
    	for (var j = 0; j < HEIGHT / 16; j++) {
    		var box = Crafty.e("Box").attr({x: i * 16, y: j * 16}).color("#000000");
    		
    		var x = Math.round(box.x / 16);
    		var y = Math.round(box.y / 16);
    		
    		if ((y == 3 && x > 4 && x < 13) || (x == 12 && y > 3 && y < 15)) {
    			box.wall = true;
    		}
    		
    		if (!map[x]) {
    			map[x] = new Array();
    		}
    		
    		map[x][y] = box;
        }
    }
    
    var tar = Crafty.e("Box").attr({x: TARGET.x * 16, y: TARGET.y * 16}).color("#000000");
    var pos = Crafty.e("Path").attr({x: START.x * 16, y: START.y * 16}).color("#000000");
    pos.val = 0;
    
    var tarp = {x: Math.round(tar.x / 16), y: Math.round(tar.y / 16)};
	var posp = {x: Math.round(pos.x / 16), y: Math.round(pos.y / 16)};
	
	game={};
	findPath(posp.x, posp.y, tarp.x, tarp.y);
	
	var i = game.path.length - 1;
	setInterval(function() {
		if (i >= 0) {
			var wp = game.path[i];
			
			pos.x = wp.x * 16;
			pos.y = wp.y * 16;
			
			i--;
		}
	}, 200);
	
	
	/**
	 * Source: http://www.tonypa.pri.ee/tbw/tut22.html
	 */
	function findPath(startx, starty, targetx, targety){
	  path={};
	  path.Unchecked_Neighbours=[];
	  path.done = false;
	  path.name="node_"+starty+"_"+startx;
	  path[path.name]={x:startx, y:starty, visited:true, parentx:null, parenty:null};
	  path.Unchecked_Neighbours[path.Unchecked_Neighbours.length]=path[path.name];
	  while(path.Unchecked_Neighbours.length>0) {
	    var N = path.Unchecked_Neighbours.shift();
	    if (N.x == targetx && N.y == targety) {
	      make_path(N);
	      path.done = true;
	      break;
	    }else {
	      N.visited=true;
	      addNode (N, N.x+1, N.y);
	      addNode (N, N.x-1, N.y);
	      addNode (N, N.x, N.y+1);
	      addNode (N, N.x, N.y-1);
	    }
	  }
	  
	  if (path.done) {
	    return true;
	  }else {
	    return false;
	  }
	}
	
	/**
	 * Source: http://www.tonypa.pri.ee/tbw/tut22.html
	 */
	function addNode (ob, x, y){
	  path.name="node_"+y+"_"+x;
	  if(map[x] && map[x][y] && !map[x][y].wall) {
	    if (!path[path.name] || path[path.name].visited != true) {
	      path[path.name]={x:x, y:y, visited:false, parentx:ob.x, parenty:ob.y};
	      path.Unchecked_Neighbours[path.Unchecked_Neighbours.length]=path[path.name];
	    }
	  }
	}
	
	/**
	 * Source: http://www.tonypa.pri.ee/tbw/tut22.html
	 */
	function make_path(ob){
	  game.path=[];
	  while (ob.parentx!=null){
	    game.path[game.path.length]={x: ob.x, y: ob.y};
	    ob=path["node_"+ob.parenty+"_"+ob.parentx];
	  }
	}
    
});