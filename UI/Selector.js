class Selector extends Entity {

	constructor(name, sprite, entityPointed, spriteOffSetX, spriteOffSetY) {
		super(name, sprite, entityPointed._pos.x, entityPointed._pos.y)
		this._entityPointed = entityPointed
		this._spriteOffSet = {
			x: spriteOffSetX,
			y: spriteOffSetY,
		}
		this.logLine()
	}

	logLine() {
		console.log("Selector pointing to ", this._entityPointed.name);
	}

	draw() {
		this._sprite.draw(this._pos.x + this._spriteOffSet.x, this._pos.y + this._spriteOffSet.y)
		this._sprite.updateSprite()
	}

	get entityPointed() {
		return this._entityPointed
	}

	set entityPointed(entityPointed) {
		this._entityPointed = entityPointed
	}
}
