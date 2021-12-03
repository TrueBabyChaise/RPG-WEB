class Faction {
	// Create new instances of the same class as static attributes
	static Neutral = new Faction("neutral")
	static Enemy = new Faction("enemy")
	static Hero = new Faction("hero")

	constructor(name) {
		this.name = name
	}
}

class Unit extends Entity {
	constructor(name, sprite, x, y) {
		super(name, sprite, x, y)
		this._strength = 0
		this._defense = 0
		this._pv = 100
		this._maxPv = this._pv
		this.faction = Faction.Neutral
	}

	get strength() {
		return this._strength
	}

	set strength(value) {
		this._strength = value
	}

	get defense() {
		return this._strength
	}

	set defense(value) {
		this._defense = value
	}

	get pv() {
		return this._pv
	}

	set pv(value) {
		this._pv = value
	}

	get maxPv() {
		return this._pv
	}

	set maxPv(value) {
		this._maxPv = value
	}

	removeHp(value) {
		if (value < 0)
			return
		this._pv = (this._pv - value) <= 0 ? 0 : this._pv - value;
	}

	addHp(value) {
		if (value < 0)
			return
		this._pv = (this._pv + value) >= this._maxPv ? this._maxPv : this._pv + value;
	}
}