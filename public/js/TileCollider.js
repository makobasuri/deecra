import TileResolver from "./TileResolver.js";

export default class TileCollider {
	constructor(tileMatrix) {
		this.tiles = new TileResolver(tileMatrix)
	}

	checkY(entity) {
		const matches = this.tiles.searchByRange(
			entity.pos.x, entity.pos.x + entity.size.x,
			entity.pos.y, entity.pos.y + entity.size.y
		)

		matches.map(match => {
			if (!match) return
			if (!match.tile.name.includes('wall')) return

			if (
				entity.vel.y > 0
				&& entity.pos.y - entity.offset.y > match.y1
			) {
				entity.pos.y = match.y1 + entity.size.y
				entity.vel.y = 0
				console.log('checkY1 is true')
			}

			if (
				entity.vel.y < 0
				&& entity.pos.y - entity.offset.y + entity.pos.y <= match.y2
			) {
				entity.pos.y = match.y2 - entity.offset.y
				entity.vel.y = 0
				console.log('checkY2 is true')
			}
		})
	}

	test(entity) {
		this.checkY(entity)
	}
}
