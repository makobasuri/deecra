import STATE from './STATE.js'
import { loadLvlTiles } from './sprites.js';
import { createBgLayer, createSpriteLayer, createCollisionLayer } from './layers.js'

export function loadTileset(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		});
		image.src = url;
	});
}

function createTiles(STATE, backgrounds) {
	backgrounds.map(
		background => background.ranges.map(([x1, x2, y1, y2]) => {
			for (let x = x1; x < x2; x++) {
				for (let y = y1; y < y2; y++) {
					STATE.tiles.set(x, y, {
						name: background.tile
					});
				}
			}
		})
	)
}

export function loadLevel(name) {
	return Promise.all([
		fetch(`/levels/${name}.json`)
			.then(result => result.json()),
		loadLvlTiles()
	]).then(([levelSpec, lvlTiles]) => {
			createTiles(STATE, levelSpec.backgrounds)

			const backgroundLayer = createBgLayer(STATE, lvlTiles)
			const spriteLayer = createSpriteLayer(STATE.entities)
			const collisionLayer = createCollisionLayer(STATE)

			STATE.addLayers([
				backgroundLayer,
				spriteLayer,
				collisionLayer
			])

			return STATE
		})
}
