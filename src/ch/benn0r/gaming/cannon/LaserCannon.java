package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Color;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.Image;
import org.newdawn.slick.SlickException;
import org.newdawn.slick.geom.Circle;
import org.newdawn.slick.geom.Rectangle;

public class LaserCannon extends RotatableCannon {

	public LaserCannon(UnitOwner p, int x, int y) {
		super(p, x, y);
	}

	@Override
	public void draw(Graphics g) throws SlickException {
		// Bauch
		g.setColor(Color.blue);
		Rectangle rect = new Rectangle(x, y, 32, 32);
		g.fill(rect);
		
		// Kanonenrohr
		Image tube = new Image("img/tube.png");
		tube.rotate(rotation);
		tube.draw(x + 14, y - 4, 1);
		
		// Turm
		g.setColor(Color.orange);
		Circle tower = new Circle(x + 16, y + 16, 8);
		g.fill(tower);
	}

	@Override
	public BasicShot fire(int tX, int tY) {
		int degrees = rotate(tX, tY, 3);
		if (this.rotation - degrees == 0) {
			// Position am Ende der Kanone, dort wort die Schüsse rauskommen
			int bX = (int)(x + 15 + Math.cos(Math.toRadians(getRotation() + 90)) * 20);
			int bY = (int)(y + 15 + Math.sin(Math.toRadians(getRotation() + 90)) * 20);
			
			return new LaserCannonShot(p, bX, bY, this);
		}
		
		return null;
	}
	
	/**
	 * Der 
	 * 
	 * @author Benjamin
	 */
	public class LaserCannonShot extends SingleShot {

		public LaserCannonShot(UnitOwner p, int x, int y, BasicCannon shooter) {
			super(p, x, y, shooter);
		}

		@Override
		public void draw(Graphics g) throws SlickException {
			Circle shape = new Circle(x, y, 2);
			
			g.fill(shape);
		}
		
	}

}
