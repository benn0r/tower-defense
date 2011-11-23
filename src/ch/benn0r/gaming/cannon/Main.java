package ch.benn0r.gaming.cannon;

import java.util.ArrayList;
import java.util.Iterator;

import org.newdawn.slick.*;

import ch.benn0r.gaming.mobs.Troll;

public class Main extends BasicGame {
	
	public ArrayList<Bullet> bullets = new ArrayList<Bullet>();
	
	public ArrayList<Cannon> cannons = new ArrayList<Cannon>();
	
	public ArrayList<Troll> mobs = new ArrayList<Troll>();
	
	public Main() {
		super("Test Cannon");
	}

	@Override
	public void render(GameContainer gc, Graphics g) throws SlickException {
		for (Troll mob : mobs) {
			mob.draw(g);
		}
		
		for (Cannon cannon : cannons) {
			cannon.draw(g);
		}
		
		// Neues Array mit allen aktiven Bullets
		ArrayList<Bullet> nBullets = new ArrayList<Bullet>();
		
		Iterator<Bullet> iter = bullets.iterator();
		while (iter.hasNext()) {
			Bullet bullet = iter.next();
			
			// Alle Bullets bewegen
			bullet.move();
			
			// Alle Bullets zeichen
			bullet.draw(g);
			
			if (bullet.isAlive()) {
				// Bullet ist noch aktiv, wird also gezeichnet
				nBullets.add(bullet);
			}
		}
		
		// Neues Array schreiben mit den aktiven Bullets
		bullets = nBullets;
	}

	@Override
	public void init(GameContainer gc) throws SlickException {
		cannons.add(new Cannon(100, 400));
		cannons.add(new Cannon(150, 400));
		cannons.add(new Cannon(200, 400));
		cannons.add(new Cannon(250, 400));
		cannons.add(new Cannon(300, 400));
		cannons.add(new Cannon(350, 400));
		
		
		mobs.add(new Troll());
		mobs.add(new Troll());
		
		/*cannons.add(new Cannon(100, 150));
		cannons.add(new Cannon(150, 150));
		cannons.add(new Cannon(200, 150));
		cannons.add(new Cannon(250, 150));
		cannons.add(new Cannon(300, 150));
		cannons.add(new Cannon(350, 150));*/
	}

	@Override
	public void update(GameContainer gc, int delta) throws SlickException {
		int tX = mobs.get(0).x;
		int tY = mobs.get(0).y + 48;
		
		for (Cannon cannon : cannons) {
			int degrees = cannon.move(tX, tY);
			
			if (cannon.getRotation() - degrees > -2 && cannon.getRotation() - degrees < 2) {
				if (cannon.bullet++ % cannon.bulletEvery == 0) {
					Bullet bullet;
					
					if ((bullet = cannon.shoot(tX, tY)) != null) {
						bullets.add(bullet);
					}
				}
			}
		}
	} 
	
	public static void main(String[] args) throws SlickException {
		AppGameContainer game = new AppGameContainer(new Main());
		
		game.setDisplayMode(600, 600, false);
		game.setVSync(true);
		game.setShowFPS(true);
		game.setTargetFrameRate(60);
		
		game.start();
	}


}