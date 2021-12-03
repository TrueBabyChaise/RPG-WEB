function createTank(x, y, ctx) {
	const img = "assets/Hero/sheets/DinoSprites - doux.png"
	const sprite = new Sprite(img, 4, 5, 24, 24, 2, ctx)
	return new Tank("Blue", sprite , x, y)
}

function createMage(x, y, ctx) {
	const img = "assets/Hero/sheets/DinoSprites - mort.png"
	const sprite = new Sprite(img, 4, 5, 24, 24, 2, ctx)
	return new Mage("Redish", sprite , x, y)
}

function createCleric(x, y, ctx) {
	const img = "assets/Hero/sheets/DinoSprites - tard.png"
	const sprite = new Sprite(img, 4, 5, 24, 24, 2, ctx)
	return new Cleric("Pinkie", sprite , x, y)
}

function createRogue(x, y, ctx) {
	const img = "assets/Hero/sheets/DinoSprites - vita.png"
	const sprite = new Sprite(img, 4, 5, 24, 24, 2, ctx)
	return new Rogue("Orangio", sprite , x, y)
}

function createRat(x, y, ctx) {
	const img = "assets/Enemy/nuclearCharacter/character_20x20_brown.png"
	const sprite = new Sprite(img, 4, 5, 20, 20, 2, ctx, false, true)
	return new Rat("Rat", sprite , x, y)
}

function createDragon(x, y, ctx) {
	const img = "assets/Enemy/nuclearCharacter/character_20x20_white.png"
	const sprite = new Sprite(img, 4, 5, 20, 20, 2, ctx, false, true)
	return new Dragon("Dragon", sprite , x, y)
}

function createKobold(x, y, ctx) {
	const img = "assets/Enemy/nuclearCharacter/character_20x20_black.png"
	const sprite = new Sprite(img, 4, 5, 20, 20, 2, ctx, false, true)
	return new Kobold("Kobold", sprite , x, y)
}

function createSelector(offSetX, offSetY, entity, ctx) {
	const img = "assets/UI/solid-arrows-thin.png"
	const sprite = new Sprite(img, 0, 0, 16, 16, 0, ctx)
	sprite.minframeX = 5
	return new Selector("Selector", sprite, entity, offSetX, offSetY)
}