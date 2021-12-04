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
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 6
		this.sprite.frameX = 0
		this.sprite.frameY = 4
		this.animationCoolDown = (this.sprite.maxframeX - this.sprite.minframeX) * this.sprite._speedAnimation
	}

	startHitAnimation() {
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 2
		this.sprite.frameX = 0
		this.sprite.frameY = 3
		this.animationCoolDown = (this.sprite.maxframeX - this.sprite.minframeX) * this.sprite._speedAnimation
	}

	startAttackAnimation() {
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 6
		this.sprite.frameX = 0
		this.sprite.frameY = 1
		this.animationCoolDown = (this.sprite.maxframeX - this.sprite.minframeX) * this.sprite._speedAnimation
	}

	startIdleAnimation() {
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 4
		this.sprite.frameX = 0
		this.sprite.frameY = 0
		this.animationCoolDown = Infinity
	}
}