class Background extends Entity {

	constructor(sprite) {
		super("background", sprite)
		this.logLine()
	}

	logLine() {
		console.log("Background created");
	}

	draw() {
		this._sprite.draw(this._pos.x, this._pos.y)
	}
}
