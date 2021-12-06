document.getElementById("actionList").style.display = "none"
actionListDiv = document.getElementById("actionList")
const popUp = document.getElementById('popUp')

window.addEventListener('resize', function(){
	for (let i = 0; i < Game.entities.length; i++) {
		const e = Game.entities[i]
		if (e instanceof Selector)
			continue
		e._pos.y = Math.round((e._pos.y * window.innerHeight) / canvas.height)
		e._pos.x = Math.round((e._pos.x * window.innerWidth) / canvas.width)
	}


	notUnitList = Game.getEntitiesWithoutInstance(Unit)

	for (let i = 0; i < notUnitList.length; i++) {
		const e = notUnitList[i]
		e._pos.y = Math.round((e._pos.y * window.innerHeight) / canvas.height)
		e._pos.x = Math.round((e._pos.x * window.innerWidth) / canvas.width)
	}

	canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})


canvas.addEventListener('mouseleave', function(e) {
	popUp.style.display = "none"
})
	
canvas.addEventListener('click', function(e) {

	let enemyList = Game.getAllFactionMember(Faction.Enemy)
	let enemy = undefined
	let pos = {
		x: e.pageX,
		y: e.pageY,
	}
	
	for (let i = 0; i < enemyList.length; i++) {
		const e = enemyList[i];
		if (e._pos.x > pos.x && pos.x > e._pos.x - e._sprite._spriteWidth &&
			e._pos.y < pos.y && pos.y < e._pos.y + e._sprite._spriteHeight) {
			enemy = e
			break
		}
	}
	if (Game.getSelector() && enemy)
		Game.getSelector().entityPointed = enemy
})
let lastOver = undefined

canvas.addEventListener('mousemove', function(e) {

	let pos = {
		x: e.pageX,
		y: e.pageY,
	}

	let enemyList =  Game.getAllFactionMember(Faction.Enemy)
	let enemy = undefined
	for (let i = 0; i < enemyList.length; i++) {
		const e = enemyList[i];
		if (e._pos.x > pos.x && pos.x > e._pos.x - e._sprite._spriteWidth &&
			e._pos.y < pos.y && pos.y < e._pos.y + e._sprite._spriteHeight) {
			enemy = e
			break
		}
	}

	if (enemy && enemy != lastOver) {
		lastOver = enemy
		popUp.style.display = null
		popUp.style.left = pos.x.toString() + "px"
		popUp.style.top = pos.y.toString() + "px"
		
		popUp.textContent = enemy.name + "\n" + "Hp: " + enemy.pv.toString() + "/" + enemy.maxPv.toString() + "\n" + "Mana: " + enemy.mana.toString() + "/" + enemy.maxMana.toString()
	}

	if (!enemy) {
		lastOver = undefined
		popUp.style.display = "none"
	} else {
		popUp.style.left = pos.x.toString() + "px"
		popUp.style.top = pos.y.toString() + "px"
	}
})

function updateStatusHUD(entity) {
	let p = document.getElementById(entity.id)
	p.style.color = "rgb(245, 43, 43)";
	updateP(entity, p)
}

function updateP(entity, p) {
	if (!p)
		return
	p.textContent = '(' + entity.constructor.name + ') ' + entity.name + ": Hp : " + entity.pv + "/" + entity.maxPv + "  Mana : " + entity.mana + "/" + entity.maxMana
}

function createPnameHpForEntity(entity, fnc, p=undefined) {
	if (!p)
		p = document.createElement('p')
	p.id = entity.id
	p.textContent = '(' + entity.constructor.name + ') ' + entity.name + ": Hp : " + entity.pv + "/" + entity.maxPv + "  Mana : " + entity.mana + "/" + entity.maxMana
	p.onclick = fnc 
	return p
}