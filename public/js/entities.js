import Entity from './Entity.js'
import Go from './traits/Go.js'
import { loadSpriteSheet } from './loaders.js';

export function createCharacter() {
	return loadSpriteSheet('steampunk').then(sprite => {

		const char = new Entity();

		char.addTrait(new Go())

		const frames = {
			left: ['go-left-0', 'go-left-1', 'go-left-2', 'go-left-3'],
			right: ['go-right-0', 'go-right-1', 'go-right-2', 'go-right-3'],
			up: ['go-up-0', 'go-up-1', 'go-up-2', 'go-up-3'],
			down: ['go-down-0', 'go-down-1', 'go-down-2', 'go-down-3'],
		}

		function routeFrame(char) {
			if (char.go.goingTo.left) {
				const frameIndex = Math.floor(char.go.distance.left / 10) % frames.left.length
				return frames.left[frameIndex]
			}
			if (char.go.goingTo.right) {
				const frameIndex = Math.floor(char.go.distance.right / 10) % frames.right.length
				return frames.right[frameIndex]
			}
			if (char.go.goingTo.up) {
				const frameIndex = Math.floor(char.go.distance.up / 10) % frames.up.length
				return frames.up[frameIndex]
			}
			if (char.go.goingTo.down) {
				const frameIndex = Math.floor(char.go.distance.down / 10) % frames.down.length
				return frames.down[frameIndex]
			}
			return 'go-down-0';
		}

		char.draw = function drawChar(context) {
			sprite.draw(routeFrame(this), context, 0, 0)
		}

		return char;
	})
}
