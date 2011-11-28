package ch.benn0r.gaming.cannon.test;

import java.util.ArrayList;

import org.newdawn.slick.AppGameContainer;
import org.newdawn.slick.BasicGame;
import org.newdawn.slick.GameContainer;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

import ch.benn0r.gaming.cannon.*;

public class LaserCannonTest extends BasicGame {
	
	public ArrayList<BasicUnit> units = new ArrayList<BasicUnit>();
	
	public UnitOwner o1 = new TestOwner();
	
	public UnitOwner o2 = new TestOwner();

	public LaserCannonTest(String title) {
		super(title);
	}

	@Override
	public void render(GameContainer gc, Graphics g) throws SlickException {
		for (BasicUnit u : units) {
			u.draw(g);
		}
	}

	@Override
	public void init(GameContainer gc) throws SlickException {
		units.add(new LaserCannon(o1, 100, 100));
		units.add(new LaserCannon(o2, 300, 300));
	}

	@Override
	public void update(GameContainer gc, int arg1) throws SlickException {
		LaserCannon c = (LaserCannon)units.get(0);
		
		BasicShot shot = c.fire(300, 300);
		if (shot != null) {
			units.add(shot);
		}
	}

	/**
	 * @param args
	 * @throws SlickException 
	 */
	public static void main(String[] args) throws SlickException {
		AppGameContainer game = new AppGameContainer(new LaserCannonTest("LaserCannon Test"));
		
		game.setDisplayMode(600, 600, false);
		game.setVSync(true);
		game.setShowFPS(true);
		game.setTargetFrameRate(60);
		
		game.start();
	}

}
