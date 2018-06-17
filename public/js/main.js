import STATE from './STATE.js'
import { loadTiles } from './loadTiles.js';
import { loadLevel } from './loaders.js';
import { drawLayers, createBgLayer, createSpriteLayer } from './layers.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

Promise.all([
	loadTiles(),
	loadLevel('dungeon-1')
]).then(([
	sprites,
	lvl
]) => {
	const backgroundLayer = createBgLayer(lvl.backgrounds, sprites)
	STATE.layers.push(backgroundLayer)

	const pos = {
		x: 164,
		y: 32
	}

	const spriteLayer = createSpriteLayer(sprites, pos)
	STATE.layers.push(spriteLayer)

	function update() {
		drawLayers(ctx)

		pos.x--
		requestAnimationFrame(update)
	}

	update()
})
