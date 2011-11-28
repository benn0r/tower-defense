package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

abstract public class BasicUnit implements Drawable {
	
	/**
	 * X-Koordinate
	 */
	protected int x;
	
	/**
	 * Y-Koordinate
	 */
	protected int y;
	
	/**
	 * Besitzer der Einheit
	 */
	protected UnitOwner p;
	
	/**
	 * Setzt X- und Y-Koordinaten
	 * 
	 * @param x
	 * @param y
	 */
	public BasicUnit(UnitOwner p, int x, int y) {
		setX(x);
		setY(y);
	}

	@Override
	public void draw(Graphics g) throws SlickException {
		// TODO Auto-generated method stub
		
	}
	
	public UnitOwner getOwner() {
		return p;
	}

	public void setOwner(UnitOwner p) {
		this.p = p;
	}
	
	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

}
