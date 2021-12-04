class Rogue extends Unit {
	constructor(name, sprite, x, y) {
	 	super(name, sprite, x, y)
		this.logLine()
		this.faction = Faction.Hero
	}

	logLine() {
		console.log("I'm a Rogue ! -", this._name);
	}

	specialAttack(enemy) {
		if (this.mana >= 5) {
			var value = getRandomInt(100)
			if (value == 0)
				enemy.removePv(enemy.maxPv)
			if (value == 99)
				this.removePv(this.maxPv)
			this.mana -= 5
			return true
		}
		return false
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
	}

	startIdleAnimation() {
		this.sprite.minframeX = 0
		this.sprite.maxframeX = 4
		this.sprite.frameX = 0
		this.animationCoolDown = Infinity
	}
}