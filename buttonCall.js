attackButton = document.getElementById('attackButton')
specialButton = document.getElementById('specialButton')
defenseButton = document.getElementById('defenseButton')
fleeButton = document.getElementById('fleeButton')

attackButton.onclick = function() {
	console.log('Attack')
}

defenseButton.onclick = function() {
	console.log('Defense')
}

specialButton.onclick = function() {
	console.log('Special')
}

// USELESS DON'T NEED TO BE IMPLEMENTED
fleeButton.onclick = function() {
	updateTurnOrder()
}