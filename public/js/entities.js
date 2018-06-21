import STATE from './STATE.js'
import Entity from './Entity.js'
import Go from './traits/Go.js'
import Velocity from './traits/Velocity.js';
import { loadCharacter } from './sprites.js';

export function updateEntities(deltaTime) {
	STATE.entities.map(entity => entity.update(deltaTime))
}

export function createCharacter() {
	return loadCharacter().then(sprite => {
		const char = new Entity();

		char.addTrait(new Velocity())
		char.addTrait(new Go())
		char.draw = function drawChar(context) {
			sprite.draw('idle', context, this.pos.x, this.pos.y)
		}

		return char;
	})
}
