import { Matrix } from './structures.js'
import TileCollider from './TileCollider.js';

const STATE = {
	layers: [],
	addLayers: function(layers) {
		layers.map(layer => this.layers.push(layer))
	},
	entities: [],
	addEntity: function(entity) { this.entities.push(entity)},
	tiles: new Matrix()
}

export default STATE

export const tileCollider = new TileCollider(STATE.tiles)

export function updateEntities(deltaTime) {
	STATE.entities.map(entity => {
		entity.update(deltaTime)

		entity.pos.x += entity.vel.x * deltaTime
		tileCollider.checkX(entity)

		entity.pos.y += entity.vel.y * deltaTime
		tileCollider.checkY(entity)
	})
}
