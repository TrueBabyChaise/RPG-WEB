class Rat extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Enemy
		this._strength = 10
	}

	logLine() {
		console.log("Ratatatata ! -", this._name);
	}

	startDeathAnimation() {
		console.log("Death Animation for Rat")
	}

	startAttackAnimation() {
		console.log("Start attack animation for :", this.name)
	}
}