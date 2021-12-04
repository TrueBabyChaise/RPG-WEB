class Tank extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Hero
	}

	logLine() {
		console.log("You can count on the Tank ! -", this._name);
	}

	startDeathAnimation() {
		this.startHitAnimation()
	}

	startHitAnimation() {
		this.sprite.minframeX = 14
		this.sprite.maxframeX = 17
		this.sprite.frameX = 14
		this.animationCoolDown = (this.sprite.maxframeX - this.sprite.minframeX) * this.sprite._speedAnimation
	}

	startAttackAnimation() {
		this.sprite.minframeX = 18
		this.sprite.maxframeX = 25
		this.sprite.frameX = 18
		this.animationCoolDown = (this.sprite.maxframeX - this.sprite.minframeX) * this.sprite._speedAnimation
		console.log("Start attack animation for :", this.name)
	}

	startIdleAnimation() {
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 4
		this.sprite.frameX = 0
		this.animationCoolDown = Infinity
	}
}