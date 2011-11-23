package ch.benn0r.gaming.mobs;

import org.newdawn.slick.Color;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.Image;
import org.newdawn.slick.SlickException;
import org.newdawn.slick.opengl.Texture;

public class Troll {
	
	private String[] files = {
		"gfx/lavatroll/walking w0000.bmp",
		"gfx/lavatroll/walking w0001.bmp",
		"gfx/lavatroll/walking w0002.bmp",
		"gfx/lavatroll/walking w0003.bmp",
		"gfx/lavatroll/walking w0004.bmp",
		"gfx/lavatroll/walking w0005.bmp",
		"gfx/lavatroll/walking w0006.bmp",
		"gfx/lavatroll/walking w0007.bmp",
	};
	
	private int i = 0;
	
	private int rate = 0;
	private int maxRate = 10;
	
	public int x = 500;
	
	public int y = 200;
	
	public void draw(Graphics g) throws SlickException {
		if (rate++ >= maxRate) {
			rate = 0;
			i++;
		}
		
		if (i >= files.length) {
			i = 0;
		}
		
		Image img = new Image(files[i]);
		img.draw(x--, y, Image.FILTER_LINEAR);
	}

}
