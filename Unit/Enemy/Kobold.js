class Kobold extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Enemy
	}

	logLine() {
		console.log("Duh ?! -", this._name);
	}
}