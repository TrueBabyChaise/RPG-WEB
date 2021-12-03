const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let entities = [];
actionListDiv = document.getElementById("actionList")

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function getEntityWithFaction(faction) {
	return entities.find(e => e.faction == faction)
}

function getFactionMemberWhoCanPlay(faction) {
	return entities.find(e => e.hasPlay == false && e.faction == faction)
}

function getAllFactionMember(faction) {
	return entities.filter(e => e.faction == faction)
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function animate() {


	ctx.clearRect(0, 0, canvas.width, canvas.height)
	entities.forEach(entity => {
		if (!entity.isDead)
			entity.draw()
	});

	entities = entities.filter(e => !e.isDead)

	if (!getFactionMemberWhoCanPlay(Faction.Hero)) {
		console.log("Enemy Turn")
		tmp = getAllFactionMember(Faction.Hero)
		enemy = getFactionMemberWhoCanPlay(Faction.Enemy)
		target = tmp[getRandomInt(tmp.length)]
		target.removePv(enemy.strength)
		enemy.hasPlay = true
		updateP(target, document.getElementById(target.id))
	}

	if (!getFactionMemberWhoCanPlay(Faction.Hero) && !getFactionMemberWhoCanPlay(Faction.Enemy))
		entities.forEach(entity => {
			entity.hasPlay = false
		});

	selector = getSelector()
	if (selector.entityPointed.isDead)
		selector.entityPointed = getEntityWithFaction(Faction.Enemy)
}

canvas.addEventListener('click', function(e) {
})

function getEntityWithId(id) {
	return entities.find(e => e.id == id)
}

function getSelector() {
	return entities.find(e => e instanceof Selector)
}

window.onload = () => {
	setInterval(animate, 1000/20);
	canvas.height = window.innerHeight / 2;
    canvas.width = window.innerWidth;

	entities.push(createTank(canvas.width * 0.1, canvas.height * 0.2, ctx))
	entities.push(createMage(canvas.width * 0.1, canvas.height * 0.4, ctx))
	entities.push(createCleric(canvas.width * 0.1, canvas.height * 0.6, ctx))
	entities.push(createRogue(canvas.width * 0.1, canvas.height * 0.8, ctx))

	entities.push(createDragon(canvas.width * 0.9, canvas.height * 0.25, ctx))
	entities.push(createRat(canvas.width * 0.9, canvas.height * 0.50, ctx))
	entities.push(createKobold(canvas.width * 0.9, canvas.height * 0.75, ctx))

	entities.push(createSelector(-24, -24, entities[entities.length - 3], ctx))

	hpListHero = document.getElementById("hpListHero")
	hpListEnemy = document.getElementById("hpListEnemy")

	entities.forEach(e => {
		if (e.faction == Faction.Hero)
			hpListHero.appendChild(createPnameHpForEntity(e, hpListClick))
		if (e.faction == Faction.Enemy)
			hpListEnemy.appendChild(createPnameHpForEntity(e, function(e) {if (getEntityWithId(e.target.id)) getSelector().entityPointed = getEntityWithId(e.target.id)}))
	});
}

function updateP(e, p) {
	p.textContent = e.name + ": " + e.pv + "/" + e.maxPv
}

function createPnameHpForEntity(e, fnc, p=undefined, ) {
	if (!p)
		p = document.createElement('p')
	p.id = e.id
	p.textContent = e.name + ": " + e.pv + "/" + e.maxPv
	p.onclick = fnc 
	return p
}

document.getElementById("actionList").style.display = "none"

function getActionEntityId() {
	return (document.querySelector("#actionList p").id)
}

function hpListClick(e) {
	if (getEntityWithId(e.target.id).hasPlay)
		return
	actionListDiv = document.getElementById("actionList")
	actionListDiv.style.display = ""
	p = document.querySelector("#actionList p")
	if (!p)
		actionListDiv.appendChild(createPnameHpForEntity(getEntityWithId(e.target.id)))
	else
		createPnameHpForEntity(getEntityWithId(e.target.id), false, p)
}

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight / 2;
    canvas.width = window.innerWidth;
})