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
		this._strength = 25
		this._defense = 0
		this._pv = 100
		this._maxPv = this._pv
		this._mana = 100
		this._maxMana = this._mana
		this.faction = Faction.Neutral
		this.hasPlay = false
		this.isDead = false
		this.isBlocking = false
		this.deathCountDown = 0
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
		return this._maxPv
	}

	set maxPv(value) {
		this._maxPv = value
	}

	get mana() {
		return this._mana
	}

	set mana(value) {
		this._mana = value
	}

	get maxMana() {
		return this._maxMana
	}

	set maxMana(value) {
		this._maxMana = value
	}

	removePv(value) {
		if (value < 0 || this.isBlocking)
			return
		this._pv = (this._pv - value) <= 0 ? 0 : this._pv - value;
		if (this.pv <= 0) {
			this.startDeathAnimation()
			this.isDead = true
		} else
			this.startHitAnimation()
	}

	addPv(value) {
		if (value < 0)
			return
		this._pv = (this._pv + value) >= this._maxPv ? this._maxPv : this._pv + value;
	}

	startDeathAnimation() {
		console.log("Start death animation for :", this.name)
	}

	startHitAnimation() {
		console.log("Start hit animation for :", this.name)
	}

	startAttackAnimation() {
		console.log("Start attack animation for :", this.name)
	}
}