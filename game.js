const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const entities = [];

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	entities.forEach(entity => {
		entity.draw()
	});
}

canvas.addEventListener('click', function(e) {
	console.log(e)
})



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

	entities.push(createSelector(48, -24, entities[0], ctx))

	hpListHero = document.getElementById("hpListHero")
	hpListEnemy = document.getElementById("hpListEnemy")

	entities.forEach(e => {
		if (e.faction == Faction.Hero) {
			p = document.createElement('p')
			p.textContent = e.name + ": " + e.pv + "/" + e.maxPv
			hpListHero.appendChild(p)
		}
		if (e.faction == Faction.Enemy) {
			p = document.createElement('p')
			p.textContent = e.name + ": " + e.pv + "/" + e.maxPv
			hpListEnemy.appendChild(p)
		}
	});
}

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight / 2;
    canvas.width = window.innerWidth;
})