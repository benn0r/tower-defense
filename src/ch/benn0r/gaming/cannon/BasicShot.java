package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

abstract public class BasicShot extends BasicUnit {
	
	/**
	 * Speed des Schusses
	 */
	protected int speed = 5;
	
	/**
	 * Element welches den Schuss abgefeuert hat
	 */
	protected BasicCannon shooter = null;
	
	/**
	 * @param p Besitzer
	 * @param x X-Koordinate
	 * @param y Y-Koordinate
	 * @param shooter Schiessende Einheit
	 */
	public BasicShot(UnitOwner p, int x, int y, BasicCannon shooter) {
		super(p, x, y);
		
		this.shooter = shooter;
	}
	
	/**
	 * Zeichnet eine einzelne Kugel
	 * 
	 * @param g Graphics
	 * @throws SlickException
	 */
	abstract public void draw(Graphics g) throws SlickException;
	
	/**
	 * Gibt das Element zurück welches diesen Schuss
	 * abgefeuert hat
	 * 
	 * @return
	 */
	public BasicCannon getParent() {
		return shooter;
	}
	
	/**
	 * Wrapper für getParent
	 * 
	 * @return
	 */
	public BasicCannon getCannon() {
		return getParent();
	}
	
	/**
	 * Wrapper für getShooter
	 * 
	 * @return
	 */
	public BasicCannon getShooter() {
		return getParent();
	}

}
