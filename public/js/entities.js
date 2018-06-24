import Entity from './Entity.js'
import Go from './traits/Go.js'
import { loadCharacter } from './sprites.js';

export function createCharacter() {
	return loadCharacter().then(sprite => {
		const char = new Entity();

		char.addTrait(new Go())
		char.draw = function drawChar(context) {
			sprite.draw('idle', context, this.pos.x, this.pos.y)
		}

		return char;
	})
}
