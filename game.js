const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const popUp = document.getElementById('popUp')
let entities = [];
actionListDiv = document.getElementById("actionList")

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function getEntityWithFaction(faction) {
	return entities.find(e => e.faction == faction && !e.isDead)
}

function getFactionMemberWhoCanPlay(faction) {
	return entities.find(e => e.hasPlay == false && e.faction == faction && !e.isDead)
}

function getAllFactionMember(faction) {
	return entities.filter(e => e.faction == faction && !e.isDead)
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

turn = 0

function animate() {

	turn++;

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	entities.forEach(entity => {
		if (!entity.isDead || entity.animationCoolDown > 0)
			entity.draw()
		entity.animationCoolDown--;
		if (entity.animationCoolDown <= 0)
			entity.startIdleAnimation()
	});

	entities = entities.filter(e => (!(e.animationCoolDown == Infinity && e.isDead)))

	if (!getFactionMemberWhoCanPlay(Faction.Hero)) {
		tmp = getAllFactionMember(Faction.Hero)
		enemy = getFactionMemberWhoCanPlay(Faction.Enemy)
		target = tmp[getRandomInt(tmp.length)]
		target.removePv(enemy.strength)
		enemy.startAttackAnimation()
		enemy.hasPlay = true
		updateP(target, document.getElementById(target.id))
	}

	if (!getFactionMemberWhoCanPlay(Faction.Hero) && !getFactionMemberWhoCanPlay(Faction.Enemy)) {
		getAllFactionMember(Faction.Hero).forEach(e => {
			p = document.getElementById(e.id)
			p.style.color = null
		})
		entities.forEach(entity => {
			entity.hasPlay = false
		});
	}

	selector = getSelector()
	if (selector.entityPointed.isDead)
		selector.entityPointed = getEntityWithFaction(Faction.Enemy)
}

/* canvas.addEventListener('click', function(e) {
}) */

canvas.addEventListener('mouseleave', function(e) {
	popUp.style.display = "none"
})

canvas.addEventListener('click', function(e) {
	for (let i = 0; i < enemyList.length; i++) {
		const e = enemyList[i];
		if (e._pos.x > pos.x && pos.x > e._pos.x - e._sprite._spriteWidth &&
			e._pos.y < pos.y && pos.y < e._pos.y + e._sprite._spriteHeight) {
			enemy = e
			break
		}
	}
	if (getSelector() && enemy)
		getSelector().entityPointed = enemy
})

canvas.addEventListener('mousemove', function(e) {
	popUp.style.position = "absolute"
	
	pos = {
		x: e.pageX,
		y: e.pageY,
	}

	enemyList = getAllFactionMember(Faction.Enemy)
	enemy = undefined
	for (let i = 0; i < enemyList.length; i++) {
		const e = enemyList[i];
		if (e._pos.x > pos.x && pos.x > e._pos.x - e._sprite._spriteWidth &&
			e._pos.y < pos.y && pos.y < e._pos.y + e._sprite._spriteHeight) {
			enemy = e
			break
		}
	}

	if (enemy) {
		popUp.style.display = null
		popUp.style.marginLeft = pos.x.toString() + "px"
		popUp.style.marginTop = pos.y.toString() + "px"
		popUp.style.minHeight = '10%'
		popUp.style.whiteSpace = "pre-wrap"
		popUp.textContent = enemy.name + "\n" + "Hp: " + enemy.pv.toString() + "/" + enemy.maxPv.toString() + "\n" + "Mana: " + enemy.mana.toString() + "/" + enemy.maxMana.toString()
	} else {
		popUp.style.display = "none"
	}
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

	entities.push(createSelector(-8, -8, entities[entities.length - 3], ctx))

	hpListHero = document.getElementById("hpListHero")
	hpListEnemy = document.getElementById("hpListEnemy")
	hpListEnemy.style.display = "none"
	entities.forEach(e => {
		if (e.faction == Faction.Hero)
			hpListHero.appendChild(createPnameHpForEntity(e, hpListClick))
		if (e.faction == Faction.Enemy)
			hpListEnemy.appendChild(createPnameHpForEntity(e, function(e) {if (getEntityWithId(e.target.id)) getSelector().entityPointed = getEntityWithId(e.target.id)}))
	});
}

function updateStatusHUD(e) {
	p = document.getElementById(e.id)
	p.style.color = "rgb(245, 43, 43)";
}

function updateP(e, p) {
	p.textContent = e.name + ": Hp : " + e.pv + "/" + e.maxPv + "  Mana : " + e.mana + "/" + e.maxMana
}

function createPnameHpForEntity(e, fnc, p=undefined, ) {
	if (!p)
		p = document.createElement('p')
	p.id = e.id
	p.textContent = e.name + ": Hp : " + e.pv + "/" + e.maxPv + "  Mana : " + e.mana + "/" + e.maxMana
	p.onclick = fnc 
	return p
}

document.getElementById("actionList").style.display = "none"

function getActionEntityId() {
	return (document.querySelector("#actionList p").id)
}

function hpListClick(e) {
	if (!getEntityWithId(e.target.id) || getEntityWithId(e.target.id).hasPlay)
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
	for (let i = 0; i < entities.length; i++) {
		const e = entities[i]
		console.log(e._pos)
		e._pos.y = Math.round((e._pos.y * window.innerHeight / 2) / canvas.height)
		e._pos.x = Math.round((e._pos.x * window.innerWidth) / canvas.width)
		console.log(e._pos)
	}
	canvas.height = window.innerHeight / 2;
    canvas.width = window.innerWidth;
})