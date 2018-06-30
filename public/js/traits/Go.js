import { Trait } from '../Entity.js'

export default class Go extends Trait {
	constructor() {
		super('go')

		this.direction = { x: 0, y: 0 }
		this.speed = 4000

		this.distance = {
			left: 0,
			right: 0,
			up: 0,
			down: 0
		}

		this.goingTo = {
			left: false,
			right: false,
			up: false,
			down: false
		}

		this.directions = {
			left: 	{ x: -1, 	y: 0 },
			right: 	{ x: 1, 	y: 0 },
			up: 	{ x: 0, 	y: -1 },
			down: 	{ x: 0, 	y: 1 }
		}
	}

	start(direction) {
		this.goingTo[direction] = !this.goingTo[direction]
		this.direction = this.directions[direction]
	}

	cancel(direction) {
		this.goingTo[direction] = !this.goingTo[direction]
		this.distance[direction] = 0
	}

	update(entity, deltaTime) {
		if (this.goingTo.left || this.goingTo.right) {
			entity.vel.x = this.speed * this.direction.x * deltaTime
		} else {
			entity.vel.x = 0
		}

		if (this.goingTo.up || this.goingTo.down) {
			entity.vel.y = this.speed * this.direction.y * deltaTime
		} else {
			entity.vel.y = 0
		}

		if (this.goingTo.left) {
			this.distance.left += -entity.vel.x * deltaTime
		}
		if (this.goingTo.right) {
			this.distance.right += entity.vel.x * deltaTime
		}
		if (this.goingTo.up) {
			this.distance.up += -entity.vel.y * deltaTime
		}
		if (this.goingTo.down) {
			this.distance.down += entity.vel.y * deltaTime
		}
	}
}
