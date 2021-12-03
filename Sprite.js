class Sprite {
	constructor(spritePath, maxframeX, maxframeY, spriteWidth, spriteHeigth, speedAnimation, canvasContext, flipY=false, flipX=false) {
		this._spritePath = spritePath
		this._spriteImage = new Image();
		this._spriteImage.src = this._spritePath
		this._maxframeX= maxframeX
		this._maxframeY = maxframeY
		this._minframeX= 0
		this._minframeY = 0
		this._frameX = 0
		this._flipY = flipY
		this._flipX = flipX
		this._frameY = 0
		this._spriteWidth = spriteWidth
		this._spriteHeigth = spriteHeigth
		this._speedAnimation = speedAnimation
		this._canvasContext = canvasContext
		this._clock = 0
	}
	
	get minframeX () {
		return this._minframeX
	}

	set minframeX(value) {
		this._minframeX = value
	}
	
	get minframeY () {
		return this._minframeY
	}

	set minframeY(value) {
		this._minframeY = value
	}

	get frameX () {
		return this._frameX
	}

	set frameX(value) {
		this._frameX = value
	}

	get frameY () {
		return this._frameY
	}

	set frameY(value) {
		this._frameY = value
	}

	draw(x, y) {
		if (this._spritePath === undefined)
			return
		this._canvasContext.save()
		this._canvasContext.translate(x, y)
		this._canvasContext.scale(this._flipX ? -1 : 1, this._flipY ? -1 : 1);
		this._canvasContext.drawImage(this._spriteImage, 
			this._spriteWidth * this._frameX, this._spriteHeigth * this._frameY, 
			this._spriteWidth, this._spriteHeigth,
			0,0,
			this._spriteWidth * 4, this._spriteHeigth * 4)
		this._canvasContext.restore()
	}

	updateSprite() {
		if (this._clock >= this._speedAnimation)
			this._frameX = (this._frameX + 1 >= this._maxframeX) ? this._minframeX : this._frameX + 1;
		this._clock = (this._clock + 1 > this._speedAnimation) ? 0 : this._clock + 1;
	}
}