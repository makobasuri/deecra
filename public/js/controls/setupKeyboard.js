import Keyboard from './Keyboard.js'

export function setupKeyboard(entity) {
	const LEFT = ['ArrowLeft', 'KeyA']
	const RIGHT = ['ArrowRight', 'KeyD']
	const UP = ['ArrowUp', 'KeyW']
	const DOWN = ['ArrowDown', 'KeyS']
	const input = new Keyboard()

	input.addMapping(
		LEFT,
		keyState => keyState ? entity.go.start('left') : entity.go.cancel('left')
	)
	input.addMapping(
		RIGHT,
		keyState => keyState ? entity.go.start('right') : entity.go.cancel('right')
	)
	input.addMapping(
		UP,
		keyState => keyState ? entity.go.start('up') : entity.go.cancel('up')
	)
	input.addMapping(
		DOWN,
		keyState => keyState ? entity.go.start('down') : entity.go.cancel('down')
	)

	return input
}
