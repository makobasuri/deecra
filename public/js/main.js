import Timer from './Timer.js'
import Keyboard from './Keyboard.js'
import { createCharacter, updateEntities } from './entities.js'
import { loadLevel } from './loaders.js';
import { drawLayers } from './layers.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

Promise.all([
	createCharacter(),
	loadLevel('dungeon-1')
]).then(([
	char,
	STATE
]) => {
	STATE.addEntity(char)
	char.pos.set(164, 20)

	const LEFT = ['ArrowLeft', 'KeyA']
	const input = new Keyboard()
	input.addMapping(
		LEFT,
		keyState => keyState ? char.go.start() : char.go.cancel()
	)
	input.listenTo(window)

	const timer = new Timer()

	timer.update = function update(deltaTime) {
		updateEntities(deltaTime)
		drawLayers(ctx)
	}

	timer.start()
})
