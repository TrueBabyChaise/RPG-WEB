attackButton = document.getElementById('attackButton')
specialButton = document.getElementById('specialButton')
defenseButton = document.getElementById('defenseButton')
fleeButton = document.getElementById('fleeButton')

attackButton.onclick = function() {
	combatResolution(entityAlive[0], getFirstEnemy(entityAlive));
	
	updateTurnOrder()
}

defenseButton.onclick = function() {
	entityAlive[0].isDefending = true;

	updateTurnOrder()
}

specialButton.onclick = function() {
	special = entityAlive[0].special;

	
	if (special.target == "hero") {
		tmp = getLowestHpHero()
		if (tmp !== undefined)
			tmp.pv += special.power
			updateDivEntity(tmp)
	}

	if (special.target == "self") {
		for (let i = 0; i < entityAlive.length; i++) {
			if (entityAlive[i].type === "hero")
				entityAlive[i].isDefending = true			
		}
	}

	if (special.target == "enemy") {
		combatResolution(entityAlive[0], getFirstEnemy(), special.power, special.isPenetrating)
	}
	entityAlive[0].mana = (entityAlive[0].mana - special.cost) < 0 ? 0 : entityAlive[0].mana - special.cost;
	updateTurnOrder();
}

// USELESS DON'T NEED TO BE IMPLEMENTED
fleeButton.onclick = function() {
	updateTurnOrder()
}