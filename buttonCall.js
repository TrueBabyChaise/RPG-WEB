attackButton = document.getElementById('attackButton')
specialAttackButton = document.getElementById('specialAttackButton')
defenseButton = document.getElementById('defenseButton')

attackButton.onclick = function() {
	let entity = Game.getEntityWithId(document.querySelector('#actionList p').id)
	if (entity.lastMove == Move.Attack)
		return
	let entityPointed = Game.getSelector().entityPointed
	entityPointed.removePv(entity.strength)
	updateP(entityPointed, document.getElementById(entityPointed.id))
	entity.startAttackAnimation()
	updateStatusHUD(entity)
	entity.lastMove = Move.Attack
	entity.hasPlay = true
	document.getElementById("actionList").style.display = "none"
}

defenseButton.onclick = function() {
	let entity = Game.getEntityWithId(document.querySelector('#actionList p').id)
	if (entity.lastMove == Move.Defense)
		return
	entity.isBlocking = true
	updateStatusHUD(entity)
	entity.lastMove = Move.Defense
	entity.hasPlay = true
	document.getElementById("actionList").style.display = "none"
}

specialAttackButton.onclick = function() {
	let entity = Game.getEntityWithId(document.querySelector('#actionList p').id)
	if (entity.lastMove == Move.SpecialAttack)
		return
	let entityPointed = Game.getSelector().entityPointed
	if (entity instanceof Cleric) {
		let ally = Game.getLowestHpFactionMember(entity.faction)
		if (!entity.specialAttack(Game.getLowestHpFactionMember(entity.faction)))
			return
		updateStatusHUD(ally)
	} else
		entity.specialAttack(entityPointed)
	entity.startAttackAnimation()
	updateP(entityPointed, document.getElementById(entityPointed.id))
	updateStatusHUD(entity)
	entity.lastMove = Move.SpecialAttack
	entity.hasPlay = true
	document.getElementById("actionList").style.display = "none"
}