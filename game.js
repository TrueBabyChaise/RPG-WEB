class Game {

	static entities = new Array()


	static addEntity(entity) {
		Game.entities.push(entity)
		Game.entities.sort((a, b) => a.sprite.z - b.sprite.z)
	}

	static removeEntityById(id) {
		Game.entities = Game.entities.filter(e => e.faction != id)
	}

	static removeEntitiesByFaction(faction) {
		Game.entities = Game.entities.filter(e => e.faction != faction)
	}

	static drawEntities() {
		Game.entities.forEach(entity => {
			if (!entity.isDead || entity.animationCoolDown > 0)
				entity.draw()
			entity.animationCoolDown--;
			if (entity.animationCoolDown <= 0)
				entity.startIdleAnimation()
		});
	}

	static removedDeadEntities() {
		Game.entities = Game.entities.filter(e => (!(e.animationCoolDown == Infinity && e.isDead)))
	}

	static getEntityWithFaction(faction) {
		return Game.entities.find(e => e.faction == faction && !e.isDead)
	}

	static getFactionMemberWhoCanPlay(faction) {
		return Game.entities.find(e => e.hasPlay == false && e.faction == faction && !e.isDead)
	}

	static getAllFactionMember(faction) {
		return Game.entities.filter(e => e.faction == faction && !e.isDead)
	}

	static getLowestHpFactionMember(faction) {
		let tmp = Game.getAllFactionMember(faction)
		let min = Infinity
		let entityLow = undefined
		for (let i = 0; i < tmp.length; i++) {
			const e = tmp[i];
			if (e.pv < min) {
				min = e.pv
				entityLow = e
			}
		}
		return entityLow
	}

	static getEntityWithId(id) {
		return Game.entities.find(e => e.id == id)
	}

	static getSelector() {
		return Game.entities.find(e => e instanceof Selector)
	}


	static getActionEntityId() {
		return (document.querySelector("#actionList p").id)
	}

	static hpListClick(e) {
		let entity = Game.getEntityWithId(e.target.id)
		if (!entity || entity.hasPlay)
			return
		actionListDiv = document.getElementById("actionList")
		Object.keys(Move).forEach(move => { if (move != 'None') document.getElementById(uncapitalize(move) + "Button").style.color = ""})
		if (entity.lastMove != Move.None)
			document.getElementById(entity.lastMove.name + "Button").style.color = "rgb(245, 43, 43)";
		actionListDiv.style.display = ""
		let p = document.querySelector("#actionList p")
		if (!p)
			actionListDiv.appendChild(createPnameHpForEntity(entity))
		else
			createPnameHpForEntity(entity, false, p)
	}
}

