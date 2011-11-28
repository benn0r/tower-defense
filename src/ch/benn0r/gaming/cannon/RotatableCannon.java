package ch.benn0r.gaming.cannon;

abstract public class RotatableCannon extends BasicCannon {
	
	public int rotation = 0;

	public RotatableCannon(UnitOwner p, int x, int y) {
		super(p, x, y);
	}
	
	public int rotate(int tX, int tY, int speed) {
		int rotation = getRotation();
		
		int aX = x + 14;
		int aY = y + 14;
		
		int bX = tX;
		int bY = tY;
		
		double deltaX = bX - aX;
		double deltaY = bY - aY;
		
		double arc = Math.atan(deltaX / deltaY);
		int degrees = (int)Math.toDegrees(arc);
		
		// negative Zahlen umkehren
		degrees = degrees < 0 ? degrees * -1 : degrees;
//		int diff = degrees > rotation ? degrees - rotation : rotation - degrees;
				
		if (deltaX <= 0 && deltaY <= 0) {
			// oben links
			degrees = 90 - degrees + 90;
		} else if (deltaX >= 0 && deltaY <= 0) {
			// oben echts
			degrees = 2 * 90 + degrees;
		} else if (deltaX >= 0 && deltaY >= 0) {
			// unten rechts
			degrees = 90 - degrees + 3 * 90;
		}
		
		if (degrees - rotation <= speed && degrees - rotation >= speed * -1) {
			speed = 1;
		}
		
		if (degrees > rotation) {
			// Im Uhrzeigersinn weiterdrehen
			rotation = rotation + speed;
		} else if (degrees < rotation) {
			// Gegen den Uhrzeigersinn weiterdrehen
			rotation = rotation - speed;
		}
		
		this.rotation = rotation;
		
		return degrees;
	}
	
	public int getRotation() {
		return rotation;
	}

}
