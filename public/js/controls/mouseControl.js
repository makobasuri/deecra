export function createMouseControl(canvas, entity, camera) {
	canvas.addEventListener('contextmenu', event => event.preventDefault())

	let lastEvent

	['mousedown', 'mousemove'].map(eventName => {
		canvas.addEventListener(eventName, event =>{
			if (event.buttons === 1) {
				entity.vel.set(0,0)
				entity.pos.set(
					event.offsetX - camera.pos.x,
					event.offsetY - camera.pos.y
				)
			} else if (
				event.buttons === 2
				&& lastEvent
				&& lastEvent.buttons === 2
				&& lastEvent.type === 'mousemove'
			) {
				camera.pos.set(
					event.offsetX - lastEvent.offsetX,
					event.offsetY - lastEvent.offsetY
				)
			}
			lastEvent = event
		})
	})
}
