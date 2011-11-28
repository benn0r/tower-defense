package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

abstract public class BasicBullet implements Drawable {
	
	/**
	 * Speed der Kugel
	 */
	protected int speed = 5;
	
	/**
	 * Zeichnet eine einzelne Kugel
	 * 
	 * @param g Graphics
	 * @throws SlickException
	 */
	abstract public void draw(Graphics g) throws SlickException;

}
