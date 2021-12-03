attackButton = document.getElementById('attackButton')
specialButton = document.getElementById('specialButton')
defenseButton = document.getElementById('defenseButton')

attackButton.onclick = function() {
	document.getElementById("actionList").style.display = "none"
	entity = getEntityWithId(document.querySelector('#actionList p').id)
	entityPointed = getSelector().entityPointed
	entityPointed.removePv(entity.strength)
	updateP(entityPointed, document.getElementById(entityPointed.id))
	entity.hasPlay = true
}

defenseButton.onclick = function() {
	entity = getEntityWithId(document.querySelector('#actionList p').id)
	entity.isBlocking = true
	document.getElementById("actionList").style.display = "none"
	entity.hasPlay = true
}

specialButton.onclick = function() {
	console.log('Special')
	document.getElementById("actionList").style.display = "none"
	entity.hasPlay = true
}