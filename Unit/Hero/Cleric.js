class Cleric extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Hero
	}

	logLine() {
		console.log("I'm the medic ! -", this._name);
	}

	startDeathAnimation() {
		this.startHitAnimation()
		this.isDead = true
	}

	startHitAnimation() {
		this.sprite.minframeX = 14
		this.sprite.maxframeX = 17
		this.sprite.frameX = 14
		this.animationCoolDown = (this.sprite.maxframeX - this.sprite.minframeX) * this.sprite._speedAnimation
	}

	startIdleAnimation() {
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 4
		this.sprite.frameX = 0
		this.animationCoolDown = Infinity
	}
}