class Entity {

	static id = 0;

	constructor(name, sprite, x, y) {
		this._pos = {
			x: x,
			y: y,
		}
		this._name = name
		this._sprite = sprite
		this._id = Entity.id++;
	}

	get id() {
		return this._id
	}

	get name() {
		return this._name
	}

	set name(name) {
		this._name = name
	}

	get sprite() {
		return this._sprite
	}

	set sprite(sprite) {
		this._sprite = sprite
	}

	draw() {
		this._sprite.draw(this._pos.x, this._pos.y)
		this._sprite.updateSprite()
	}
}