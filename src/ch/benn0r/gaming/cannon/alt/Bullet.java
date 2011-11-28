package ch.benn0r.gaming.cannon.alt;

import org.newdawn.slick.Color;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;
import org.newdawn.slick.Sound;
import org.newdawn.slick.geom.Shape;

public class Bullet {
	
	protected int speed = 5;
	
	protected int angle = 0;
	
	protected int length = 0;
	
	protected int maxLength = 500;
	
	protected Shape shape;
	
	protected Sound sound;
	
	public Bullet(int angle, int x, int y) throws SlickException {
		this.angle = angle;
		if (shape != null) {
			shape.setCenterX(x);
			shape.setCenterY(y);
		}
		
		sound = new Sound("sfx/39459__the-bizniss__laser(1).wav");
//		sound = new Sound("sfx/gunshot.wav");
	}
	
	public void move() {
		length += speed;
		
		shape.setCenterX((float) (shape.getCenterX() + Math.cos(Math.toRadians(angle + 90)) * speed));
		shape.setCenterY((float) (shape.getCenterY() + Math.sin(Math.toRadians(angle + 90)) * speed));
	}
	
	public void draw(Graphics g) {
		if (isAlive()) {
			g.setColor(Color.yellow);
			g.fill(shape);
		}
	}
	
	public void play() {
//		sound.play();
	}
	
	public boolean isAlive() {
		return length < maxLength;
	}

}
