attackButton = document.getElementById('attackButton')
specialAttackButton = document.getElementById('specialAttackButton')
defenseButton = document.getElementById('defenseButton')

attackButton.onclick = function() {
	if (!Game.isRunning)
		return
	let entity = Game.getEntityWithId(document.querySelector('#actionList p').id)
	if (entity.lastMove == Move.Attack)
		return
	let entityPointed = Game.getSelector().entityPointed
	let lastPv = entityPointed.pv
	entityPointed.removePv(entity.strength)
	updateP(entityPointed, document.getElementById(entityPointed.id))
	entity.startAttackAnimation()
	updateStatusHUD(entity)
	entity.lastMove = Move.Attack
	entity.hasPlay = true
	document.getElementById("actionList").style.display = "none"
	console.log(Math.abs(entityPointed.pv - lastPv), lastPv, entityPointed.pv)
	Game.addLog(entity.name + " had infliged " + Math.abs(entityPointed.pv - lastPv) + " to " + entityPointed.name, Game.turn, entity.id)
}

defenseButton.onclick = function() {
	if (!Game.isRunning)
		return
	let entity = Game.getEntityWithId(document.querySelector('#actionList p').id)
	if (entity.lastMove == Move.Defense)
		return
	entity.isBlocking = true
	updateStatusHUD(entity)
	entity.lastMove = Move.Defense
	entity.hasPlay = true
	Game.addLog(entity.name + " protect himself", Game.turn, entity.id)
	document.getElementById("actionList").style.display = "none"
}

specialAttackButton.onclick = function() {
	if (!Game.isRunning)
		return
	let entity = Game.getEntityWithId(document.querySelector('#actionList p').id)
	if (entity.lastMove == Move.SpecialAttack)
		return
	let entityPointed = Game.getSelector().entityPointed
	if (entity instanceof Cleric) {
		let ally = Game.getLowestHpFactionMember(entity.faction)
		let lastPv = ally.pv
		if (!entity.specialAttack(ally))
			return
		Game.addLog(entity.name + " had healed " + ally.name + " for " + Math.abs(lastPv - ally.pv), Game.turn, entity.id)
		updateStatusHUD(ally)
	} else {
		let lastPv = entityPointed.pv
		entity.specialAttack(entityPointed)
		Game.addLog(entity.name + " had infliged " + Math.abs(entityPointed.pv - lastPv) + " to " + entityPointed.name, Game.turn, entity.id)
	}
	entity.startAttackAnimation()
	updateP(entityPointed, document.getElementById(entityPointed.id))
	updateStatusHUD(entity)
	entity.lastMove = Move.SpecialAttack
	entity.hasPlay = true
	document.getElementById("actionList").style.display = "none"
}