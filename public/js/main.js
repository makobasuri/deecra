import STATE from './STATE.js'
import { loadLvlTiles, loadCharacter } from './loadTiles.js';
import { loadLevel } from './loaders.js';
import { drawLayers, createBgLayer, createSpriteLayer } from './layers.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

Promise.all([
	loadLvlTiles(),
	loadCharacter(),
	loadLevel('dungeon-1')
]).then(([
	sprites,
	char,
	lvl
]) => {
	const backgroundLayer = createBgLayer(lvl.backgrounds, sprites)
	STATE.layers.push(backgroundLayer)

	const pos = {
		x: 164,
		y: 16
	}

	const spriteLayer = createSpriteLayer(char, pos)
	STATE.layers.push(spriteLayer)

	function update() {
		drawLayers(ctx)

		//pos.x--
		requestAnimationFrame(update)
	}

	update()
})
