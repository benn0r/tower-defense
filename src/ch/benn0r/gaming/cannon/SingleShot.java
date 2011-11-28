package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

abstract public class SingleShot extends BasicShot {
	
	/**
	 * @param p Besitzer
	 * @param x X-Koordinate
	 * @param y Y-Koordinate
	 * @param shooter Schiessende Einheit
	 */
	public SingleShot(UnitOwner p, int x, int y, BasicCannon shooter) {
		super(p, x, y, shooter);
	}

	@Override
	abstract public void draw(Graphics g) throws SlickException;

}
