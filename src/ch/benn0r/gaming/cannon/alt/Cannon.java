package ch.benn0r.gaming.cannon.alt;

import org.newdawn.slick.Color;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.Image;
import org.newdawn.slick.SlickException;
import org.newdawn.slick.geom.Circle;
import org.newdawn.slick.geom.Rectangle;


public class Cannon {
	
	public int x;
	
	public int y;
	
	private int rotate = 0;
	
	private boolean showName = false;
	
	public int radius = 500;
	
	public Circle sRadius = null;
	
	public int bullet = 0;
	
	public int bulletEvery = 10;

	public Cannon(int x, int y) {
		this.x = x;
		this.y = y;
		
		sRadius = new Circle(x, y, radius);
	}
	
	public int move(int tX, int tY) {
		if (sRadius.contains(tX, tY)) {
			int rotation = getRotation();
			
			int aX = x + 14;
			int aY = y + 14;
			
			int bX = tX;
			int bY = tY;
			
			double deltaX = bX - aX;
			double deltaY = bY - aY;
			
			double arc = Math.atan(deltaX / deltaY);
			int degrees = (int)Math.toDegrees(arc);
			
			// negative Zahlen umkehren
			degrees = degrees < 0 ? degrees * -1 : degrees;
//			int diff = degrees > rotation ? degrees - rotation : rotation - degrees;
					
			if (deltaX <= 0 && deltaY <= 0) {
				// oben links
				degrees = 90 - degrees + 90;
			} else if (deltaX >= 0 && deltaY <= 0) {
				// oben echts
				degrees = 2 * 90 + degrees;
			} else if (deltaX >= 0 && deltaY >= 0) {
				// unten rechts
				degrees = 90 - degrees + 3 * 90;
			}
			
			int speed = 1;
			if (degrees - rotation > 3 || degrees - rotation < -3) {
				speed = 3;
			}
			
			if (degrees > rotation) {
				// Im Uhrzeigersinn weiterdrehen
				rotate(rotation + speed);
			} else if (degrees < rotation) {
				// Gegen den Uhrzeigersinn weiterdrehen
				rotate(rotation - speed);
			}
			
			return degrees;
		}

		// Ziel zu weit entfernt, keine Drehung
		return 0;
	}
	
	public void draw(Graphics g) throws SlickException {
		
		// Bauch des Panzers
		g.setColor(Color.darkGray);
		Rectangle rect = new Rectangle(x, y, 32, 32);
		g.fill(rect);
		
		// Das Kanonenrohr
		Image tube = new Image("img/tube.png");
		tube.rotate(rotate);
		tube.draw(x + 14, y - 4, 1);
		
		// Der Turm des Panzers
		g.setColor(new Color(116, 116, 116));
		Circle tower = new Circle(x + 16, y + 16, 8);
		g.fill(tower);
		
		if (showName) {
			// Beschreibung
			g.setColor(Color.white);
			g.drawString("Cannon", x - 12, y - 20);
		}
	}
	
	public Bullet shoot(int tX, int tY) throws SlickException {
		if (sRadius.contains(tX, tY)) {
			// Position am Ende der Kanone, dort wort die Schüsse rauskommen
			int bX = (int)(x + 15 + Math.cos(Math.toRadians(getRotation() + 90)) * 20);
			int bY = (int)(y + 15 + Math.sin(Math.toRadians(getRotation() + 90)) * 20);
			
			Bullet bullet = new CannonBullet(getRotation(), bX, bY);
			bullet.play();
			
			return bullet;
		}
		return null;
	}
	
	public void rotate(int rotate) {
		this.rotate = rotate;
	}
	
	public int getRotation() {
		return rotate;
	}
	
	public void showName(boolean showName) {
		this.showName = showName;
	}
	
	public void showName() {
		showName = false;
	}
	
	public class CannonBullet extends Bullet {
		
		public CannonBullet(int angle, int x, int y) throws SlickException {
			super(angle, x, y);
			
			speed = 3;
			shape = new Circle(x, y, 2);		
		}
		
	}

}
