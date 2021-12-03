class Dragon extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Enemy
	}

	logLine() {
		console.log("Don't steal my fortune ! -", this._name);
	}
}