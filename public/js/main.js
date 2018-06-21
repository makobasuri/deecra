import STATE from './STATE.js'
import Timer from './Timer.js'
import Keyboard from './Keyboard.js'
import { createCharacter } from './entities.js'
import { loadLvlTiles } from './sprites.js';
import { loadLevel } from './loaders.js';
import { drawLayers, createBgLayer, createSpriteLayer } from './layers.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

Promise.all([
	loadLvlTiles(),
	createCharacter(),
	loadLevel('dungeon-1')
]).then(([
	sprites,
	char,
	lvl
]) => {
	char.pos.set(164, 20)

	const LEFT = ['ArrowLeft', 'KeyA']
	const input = new Keyboard()
	input.addMapping(
		LEFT,
		keyState => keyState ? char.go.start() : char.go.cancel()
	)
	input.listenTo(window)

	const backgroundLayer = createBgLayer(lvl.backgrounds, sprites)
	STATE.layers.push(backgroundLayer)

	const spriteLayer = createSpriteLayer(char)
	STATE.layers.push(spriteLayer)

	const timer = new Timer()

	timer.update = function update(deltaTime) {
		char.update(deltaTime)
		drawLayers(ctx)
	}

	timer.start()
})
