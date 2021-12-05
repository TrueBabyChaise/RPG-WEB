const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasHeightPrct = 0.7
const canvasWidthPrct = 1

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function enemyTurn() {
	let tmp = Game.getAllFactionMember(Faction.Hero)
	let enemy = Game.getFactionMemberWhoCanPlay(Faction.Enemy)
	let target = tmp[getRandomInt(tmp.length)]
	target.removePv(enemy.strength)
	enemy.startAttackAnimation()
	enemy.hasPlay = true
	updateP(target, document.getElementById(target.id))
}

function resetTurn() {
	Game.getAllFactionMember(Faction.Hero).forEach(e => {
		let p = document.getElementById(e.id)
		p.style.color = null
	})
	Game.entities.forEach(entity => {
		entity.hasPlay = false
	});
}

function gameLoop() {

	ctx.clearRect(0, 0, canvas.width, canvas.height)

	Game.drawEntities()
	
	Game.removedDeadEntities()

	if (!Game.getFactionMemberWhoCanPlay(Faction.Hero))
		enemyTurn()

	if (!Game.getFactionMemberWhoCanPlay(Faction.Hero) && !Game.getFactionMemberWhoCanPlay(Faction.Enemy))
		resetTurn()

	let selector = Game.getSelector()
	if (selector.entityPointed.isDead)
		selector.entityPointed = Game.getEntityWithFaction(Faction.Enemy)
}

window.onload = () => {
	setInterval(gameLoop, 1000/20);
	canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

	Game.addEntity(createTank(canvas.width * 0.1, canvas.height * 0.22, ctx))
	Game.addEntity(createMage(canvas.width * 0.1, canvas.height * 0.33, ctx))
	Game.addEntity(createCleric(canvas.width * 0.1, canvas.height * 0.44, ctx))
	Game.addEntity(createRogue(canvas.width * 0.1, canvas.height * 0.55, ctx))

	Game.addEntity(createDragon(canvas.width * 0.9, canvas.height * 0.25, ctx))
	Game.addEntity(createRat(canvas.width * 0.9, canvas.height * 0.375, ctx))
	Game.addEntity(createKobold(canvas.width * 0.9, canvas.height * 0.50, ctx))

	Game.addEntity(createSelector(-8, -8, Game.entities[Game.entities.length - 3], ctx))
	Game.addEntity(createBackground(ctx))

	let hpListHero = document.getElementById("hpListHero")
	let hpListEnemy = document.getElementById("hpListEnemy")
	hpListEnemy.style.display = "none"

	Game.entities.forEach(e => {
		if (e.faction == Faction.Hero)
			hpListHero.appendChild(createPnameHpForEntity(e, Game.hpListClick))
		if (e.faction == Faction.Enemy)
			hpListEnemy.appendChild(createPnameHpForEntity(e, function(e) {if (getEntityWithId(e.target.id)) getSelector().entityPointed = getEntityWithId(e.target.id)}))
	});
}