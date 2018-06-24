import Timer from './Timer.js'
import Keyboard from './Keyboard.js'
import { updateEntities } from './STATE.js'
import { createCharacter } from './entities.js'
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
	char.pos.set(164, 40)
	char.size.set(27, 32)
	char.offset.set(0, 12)

	const LEFT = ['ArrowLeft', 'KeyA']
	const RIGHT = ['ArrowRight', 'KeyD']
	const UP = ['ArrowUp', 'KeyW']
	const DOWN = ['ArrowDown', 'KeyS']
	const input = new Keyboard()
	input.addMapping(
		LEFT,
		keyState => {
			keyState ? char.go.start('left') : char.go.cancel('left')
			console.log(keyState)
		}
	)
	input.addMapping(
		RIGHT,
		keyState => keyState ? char.go.start('right') : char.go.cancel('right')
	)
	input.addMapping(
		UP,
		keyState => keyState ? char.go.start('up') : char.go.cancel('up')
	)
	input.addMapping(
		DOWN,
		keyState => keyState ? char.go.start('down') : char.go.cancel('down')
	)
	input.listenTo(window)

	const timer = new Timer()

	timer.update = function update(deltaTime) {
		updateEntities(deltaTime)
		drawLayers(ctx)
	}

	timer.start()
})
