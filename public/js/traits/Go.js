import { Trait } from '../Entity.js'

export default class Go extends Trait {
	constructor() {
		super('go')

		this.duration = 0.5
		this.velocity = 0
		this.engageTime = 0
	}

	start() {
		this.velocity = 20
		this.engageTime = this.duration
	}

	cancel() {
		this.engageTime = 0
	}

	update(entity, deltaTime) {
		if (this.engageTime > 0) {
			entity.vel.x = -this.velocity
			this.engageTime -= deltaTime
		}
	}
}
