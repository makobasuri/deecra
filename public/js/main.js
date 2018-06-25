import Camera from './Camera.js'
import Timer from './Timer.js'
import { setupKeyboard } from './controls/setupKeyboard.js'
import { updateEntities } from './STATE.js'
import { createCharacter } from './entities.js'
import { loadLevel } from './loaders.js';
import { drawLayers } from './layers.js'
import { createMouseControl } from './controls/mouseControl.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

Promise.all([
	createCharacter(),
	loadLevel('dungeon-1')
]).then(([
	char,
	STATE
]) => {
	const camera = new Camera()

	window.camera = camera

	STATE.addEntity(char)
	char.pos.set(164, 40)
	char.size.set(27, 32)
	char.offset.set(0, 12)

	const input = setupKeyboard(char)
	input.listenTo(window)

	createMouseControl(canvas, char, camera)

	const timer = new Timer()

	timer.update = function update(deltaTime) {
		updateEntities(deltaTime)
		drawLayers(ctx, camera)
	}

	timer.start()
})
