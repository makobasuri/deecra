import STATE from './STATE.js'
import { loadLvlTiles } from './sprites.js';
import { createBgLayer, createSpriteLayer } from './layers.js'

export function loadTileset(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		});
		image.src = url;
	});
}

export function loadLevel(name) {
	return Promise.all([
		fetch(`/levels/${name}.json`)
			.then(result => result.json()),
		loadLvlTiles()
	]).then(([levelSpec, lvlTiles]) => {
			const backgroundLayer = createBgLayer(levelSpec.backgrounds, lvlTiles)
			STATE.addLayer(backgroundLayer)

			const spriteLayer = createSpriteLayer(STATE.entities)
			STATE.addLayer(spriteLayer)

			return STATE
		})
}
