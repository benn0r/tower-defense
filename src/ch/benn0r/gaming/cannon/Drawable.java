package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

/**
 * Alle Objekte die auf dem Plan gezeichnet werden
 * implementieren dieses Interface
 * 
 * @author benjamin@benn0r.ch
 *
 */
public interface Drawable {
	
	/**
	 * Zeichnet ein Objekt auf den Plan, wo und wie
	 * entscheiden die Objekte selber
	 * 
	 * @param g
	 * @throws SlickException
	 */
	public void draw(Graphics g) throws SlickException;

}
