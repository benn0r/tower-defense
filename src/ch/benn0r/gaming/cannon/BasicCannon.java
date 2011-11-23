package ch.benn0r.gaming.cannon;

import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;
import org.newdawn.slick.geom.Circle;

/**
 * BasicCannon
 * 
 * @author benjamin@benn0r.ch
 */
abstract public class BasicCannon implements Drawable {
	
	/**
	 * X-Koordinate
	 */
	protected int x;
	
	/**
	 * Y-Koordinate
	 */
	protected int y;
	
	/**
	 * Breite
	 */
	protected int width;
	
	/**
	 * Höhe
	 */
	protected int height;
	
	/**
	 * Reichweite der Kanone
	 */
	protected Circle fireRange;
	
	/**
	 * Wie weit die Kanone gucken kann
	 */
	protected Circle viewRange;
	
	/**
	 * Setzt X- und Y-Koordinaten
	 * 
	 * @param x
	 * @param y
	 */
	public BasicCannon(int x, int y) {
		setX(x);
		setY(y);
	}
	
	/**
	 * Setzt X- und Y-Koordinaten und die Breite
	 * sowie Höhe der Kanone.
	 * 
	 * Diese Methode wird nur von den Kindklassen
	 * aufgerufen.
	 * 
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 */
	protected BasicCannon(int x, int y, int width, int height) {
		this(x, y);
		
		setWidth(width);
		setHeight(height);
	}
	
	/**
	 * Setzt X- und Y-Koordinaten, Breite und Höhe und die
	 * Reichweite der Kanone.
	 * 
	 * Diese Methode wird nur von den Kindklassen
	 * aufgerufen.
	 * 
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 * @param fireRange
	 * @param viewRange
	 */
	protected BasicCannon(int x, int y, int width, int height, int fireRange, int viewRange) {
		this(x, y, width, height);
		
		setFireRange(new Circle(getCenterX(), getCenterY(), fireRange));
		setViewRange(new Circle(getCenterX(), getCenterY(), viewRange));
	}
	
	/**
	 * Zeichnet die Kanone, jede Kindkanone stellt sich selber dar,
	 * deshalb ist dieses Methode abstrakt
	 * 
	 * @param g Graphics
	 * @throws SlickException
	 */
	abstract public void draw(Graphics g) throws SlickException;
	
	/**
	 * Schiesst eine Kugel auf ein bestimmtes Ziel
	 * 
	 * @param tX X-Koordinate von Target
	 * @param tY Y-Koordinate von Target
	 * @return Eine abgefeuerte Kugel
	 */
	abstract public BasicBullet fire(int tX, int tY);
	
	public boolean canFire(BasicTarget t) {
		return getFireRange().contains(t.getCenterX(), t.getCenterY());
	}
	
	public boolean canView(BasicTarget t) {
		return getViewRange().contains(t.getCenterX(), t.getCenterY());
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

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getCenterX() {
		return x + (width / 2);
	}
	
	public int getCenterY() {
		return y + (height / 2);
	}

	
	public Circle getFireRange() {
		return fireRange;
	}
	

	public void setFireRange(Circle fireRange) {
		this.fireRange = fireRange;
	}
	

	public Circle getViewRange() {
		return viewRange;
	}
	

	public void setViewRange(Circle viewRange) {
		this.viewRange = viewRange;
	}
	
}
