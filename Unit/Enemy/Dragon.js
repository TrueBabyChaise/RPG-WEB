class Dragon extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Enemy
		this._strength = 10
	}

	logLine() {
		console.log("Don't steal my fortune ! -", this._name);
	}

	startDeathAnimation() {
		console.log("Start death animation for :", this.name)
	}

	startAttackAnimation() {
		console.log("Start attack animation for :", this.name)
	}
}