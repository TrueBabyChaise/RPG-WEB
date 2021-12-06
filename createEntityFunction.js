function createTank(x, y, ctx) {
	const img = "assets/Hero/sheets/Doux_96_96.png"
	const sprite = new Sprite(img, 4, 5, 96, 96, 3, ctx)
	return new Tank("Blue", sprite , x, y)
}

function createMage(x, y, ctx) {
	const img = "assets/Hero/sheets/Mort_96_96.png"
	const sprite = new Sprite(img, 4, 5, 96, 96, 3, ctx)
	return new Mage("Redish", sprite , x, y)
}

function createCleric(x, y, ctx) {
	const img = "assets/Hero/sheets/Tard_96_96.png"
	const sprite = new Sprite(img, 4, 5, 96, 96, 3, ctx)
	return new Cleric("Pinkie", sprite , x, y)
}

function createRogue(x, y, ctx) {
	const img = "assets/Hero/sheets/Vita_96_96.png"
	const sprite = new Sprite(img, 4, 5, 96, 96, 3, ctx)
	return new Rogue("Orangio", sprite , x, y)
}

function createRat(x, y, ctx) {
	const img = "assets/Enemy/nuclearCharacter/character_80x80_brown.png"
	const sprite = new Sprite(img, 4, 5, 80, 80, 3, ctx, false, true)
	return new Rat("Rat", sprite , x, y)
}

function createDragon(x, y, ctx) {
	const img = "assets/Enemy/nuclearCharacter/character_80x80_white.png"
	const sprite = new Sprite(img, 4, 5, 80, 80, 3, ctx, false, true)
	return new Dragon("Dragon", sprite , x, y)
}

function createKobold(x, y, ctx) {
	const img = "assets/Enemy/nuclearCharacter/character_80x80_black.png"
	const sprite = new Sprite(img, 4, 5, 80, 80, 3, ctx, false, true)
	return new Kobold("Kobold", sprite , x, y)
}

function createSelector(offSetX, offSetY, entity, ctx) {
	const img = "assets/UI/solid-arrows-thin.png"
	const sprite = new Sprite(img, 0, 0, 16, 16, 0, ctx)
	sprite.minframeX = 5
	return new Selector("Selector", sprite, entity, offSetX, offSetY)
}

function createBackground(ctx) {
	const img = "assets/background/handpainted_26.png"
	const sprite = new Sprite(img, 0, 0, 0, 0, 0, ctx)
	sprite.z = -1
	return new Background(sprite)
}