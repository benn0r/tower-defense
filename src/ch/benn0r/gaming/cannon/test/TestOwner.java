package ch.benn0r.gaming.cannon.test;

import ch.benn0r.gaming.cannon.UnitOwner;

/**
 * Nur zum testen, symbolisiert einen Spieler auf der Karte
 * 
 * @author Benjamin 
 */
public class TestOwner implements UnitOwner {
	
	public String getName() {
		return this.toString();
	}

}
