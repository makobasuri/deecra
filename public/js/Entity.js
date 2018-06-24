import { Vec2 } from './structures.js'

export class Trait {
	constructor(name) {
		this.NAME = name
	}

	update() {
		console.warn('Unhandled update call in trait')
	}
}

export default class Entity {
	constructor() {
		this.pos = new Vec2(0, 0)
		this.vel = new Vec2(0, 0)
		this.size = new Vec2(0, 0)
		this.offset = new Vec2(0, 0)
		this.traits = []
	}

	addTrait(trait) {
		this.traits.push(trait)
		this[trait.NAME] = trait
	}

	update(deltaTime) {
		this.traits.map(trait => trait.update(this, deltaTime))
	}
}
