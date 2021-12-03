actualTurn = 1
listOrder = getSpeedOrder()
entityAlive = getTurnOrder(entityAlive)
document.getElementById('attackOrder').textContent = entityAlive.map(e => e.class).join(" -> ")

function updateTurnOrder() {

	tmp = [...entityAlive]
	entityAlive = []
	for (let i = 0; i < tmp.length; i++) {
		const e = tmp[i];
		if (e.pv > 0)
			entityAlive.push(e)
	}
	e = entityAlive.shift()
	entityAlive.push(e)
	entityAlive[0].isDefending = false;
	document.getElementById('attackOrder').textContent = entityAlive.map(e => e.class).join(" -> ")
	if (entityAlive.length === 1)
		return
	if (entityAlive[0].type === "enemy") {
		combatResolution(entityAlive[0], pickRandomEntityWithType("hero"))
		updateTurnOrder()
	}
}

function pickRandomEntityWithType(type) {
	entityTypeList = entityAlive.filter(e => e.type === type)
	return entityTypeList[Math.random(entityTypeList.length)]
}

function getFirstEnemy() {
	for (let i = 0; i < entityAlive.length; i++) {
		const e = entityAlive[i];
		if (e.type == "enemy") {
			return e
		}
	}
	return undefined
}

function combatResolution(dealer, taker, dealerDmg, isPenetrating = false) {
	if (taker === undefined || dealer === undefined)
		return
	if (taker.isDefending && !isPenetrating)
		return
	log = "<p> Start of Turn : " + actualTurn + "</p>"
	document.getElementById('logInfo').innerHTML += log
	taker.pv -= dealerDmg ? dealerDmg : dealer.strength
	takerDiv = document.getElementById(taker.class)
	takerPv = takerDiv.querySelector('#pv')
	takerPv.textContent = taker.pv

	log = "<p>" + capitalize(dealer.class) + " has deal " + (dealerDmg ? dealerDmg : dealer.strength) + " damage to " + capitalize(taker.class) + "</p>" 
	log += "<p>" + capitalize(taker.class) + " has " + taker.pv + " pv</p>" 
	document.getElementById('logInfo').innerHTML += log

	if (taker.pv <= 0) {
		takerDiv.style.display = 'none'
	}/* else {
		dealer.pv -= taker.strength
		dealerDiv = document.getElementById(dealer.class)
		dealerPv = dealerDiv.querySelector('#pv')
		dealerPv.textContent = dealer.pv

		log = "<p>" + capitalize(taker.class) + " has deal " + taker.strength + " damage to " + capitalize(dealer.class) + "</p>" 
		log += "<p>" + capitalize(dealer.class) + " has " + dealer.pv + " pv</p>" 
		document.getElementById('logInfo').innerHTML += log
		if (dealer.pv <= 0)
			dealerDiv.style.display = 'none'
	}*/
	log = "<p> End of Turn : " + actualTurn + "</p>"
	log = "<p> ------------------------------- </p>"
	document.getElementById('logInfo').innerHTML += log
	actualTurn += 1
}

function getLowestHpHero() {
	min = Infinity
	index = -1

	for (let i = 0; i < entityAlive.length; i++) {
		const e = entityAlive[i];
		if (e.type === "hero" && e.pv < min) {
			min = e.pv
			index = i
		}
	}

	if (index == -1)
		return undefined
	return entityAlive[index]
}

function getMaxSpeed(entityAlive) {
	max = 0
	
	entityAlive.forEach(e => {
		if (e.speed > max)
			max = e.speed
	})

	return max
}

function getSpeedOrder(last) {
	var listOrder = new Array()
	max = getMaxSpeed(entityAlive)

	return listOrder
}

function getTurnOrder(entityAlive) {
	var tmp = new Array()
	entityAlive.forEach(e => {
		if (e.type == 'hero') {
			tmp.reverse()
			tmp.push(e)
			tmp.reverse()
		}
		if (e.type == 'enemy')
			tmp.push(e)
	});
	return tmp
}