const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasHeightPrct = 0.7
const canvasWidthPrct = 1

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let timerEnemyTurn = 0

function enemyTurn() {
	let tmp = Game.getAllFactionMember(Faction.Hero)
	let enemy = Game.getFactionMemberWhoCanPlay(Faction.Enemy)

	if (!tmp || !enemy)
		return
	let target = tmp[getRandomInt(tmp.length)]
	let lastPv = target.pv
	target.removePv(enemy.strength)	
	enemy.startAttackAnimation()
	enemy.hasPlay = true
	Game.addLog(enemy.name + " has infliged " + Math.abs(target.pv - lastPv) + " to " + target.name, Game.turn, enemy.id)
	updateP(target, document.getElementById(target.id))
	timerEnemyTurn = 50
}

function resetTurn() {
	Game.getAllFactionMember(Faction.Hero).forEach(e => {
		let p = document.getElementById(e.id)
		p.style.color = null
	})
	Game.entities.forEach(entity => {
		entity.hasPlay = false
	});

	Game.turn++
	Log.idForTurn = 0
}

function launchDeathScreen() {
	if (Game.getSelector())
		Game.removeEntityById(Game.getSelector().id)
	enemies = Game.getAllFactionMember(Faction.Enemy)
	for (let i = 0; i < enemies.length; i++) {
		enemies[i]._pos.x = canvas.width * (0.25 + 0.25 * (i))
		enemies[i]._pos.y = canvas.height * 0.55 
	}
	document.getElementsByClassName("hud")[0].style.display = 'none'
	Game.isRunning = false
}

function launchWinScreen() {
	if (Game.getSelector())
		Game.removeEntityById(Game.getSelector().id)
	heroes = Game.getAllFactionMember(Faction.Hero)
	for (let i = 0; i < heroes.length; i++) {
		heroes[i]._pos.x = canvas.width * (0.15 + 0.20 * (i))
		heroes[i]._pos.y = canvas.height * 0.55 
	}
	document.getElementsByClassName("hud")[0].style.display = 'none'
	Game.isRunning = false
}


function gameLoop() {

	ctx.clearRect(0, 0, canvas.width, canvas.height)

	Game.drawEntities()
	
	Game.removedDeadEntities()

	if (!Game.getFactionMemberWhoCanPlay(Faction.Hero) && timerEnemyTurn <= 0)
		enemyTurn()
	else if (timerEnemyTurn > 0)
		timerEnemyTurn--

	if (!Game.getFactionMemberWhoCanPlay(Faction.Hero) && !Game.getFactionMemberWhoCanPlay(Faction.Enemy) && timerEnemyTurn <= 0)
		resetTurn()
	if (!Game.getEntityWithFaction(Faction.Hero))
		launchDeathScreen()

	if (!Game.getEntityWithFaction(Faction.Enemy))
		launchWinScreen()

	showLastLog()
	
	let selector = Game.getSelector()
	if (selector && Game.getEntityWithFaction(Faction.Enemy) && selector.entityPointed.isDead)
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
	Game.addEntity(createSelector(-8, -8, Game.entities[Game.entities.length - 1], ctx))
	Game.addEntity(createRat(canvas.width * 0.9, canvas.height * 0.375, ctx))
	Game.addEntity(createKobold(canvas.width * 0.9, canvas.height * 0.50, ctx))

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