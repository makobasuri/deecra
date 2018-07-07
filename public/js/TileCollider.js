import TileResolver from "./TileResolver.js";

export default class TileCollider {
	constructor(tileMatrix) {
		this.tiles = new TileResolver(tileMatrix)
	}

	checkX(entity) {
		let x;
		if (entity.vel.x > 0) {
			x = entity.pos.x + entity.size.x - entity.offset.x
		} else if (entity.vel.x < 0) {
			x = entity.pos.x
		} else {
			return
		}

		const matches = this.tiles.searchByRange(
			x, x,
			entity.pos.y + entity.offset.y,
			entity.pos.y + entity.offset.y + entity.size.y
		)

		matches.map(match => {
			if (!match) return
			if (!match.tile.name.includes('wall')) return

			if (
				entity.vel.x > 0
				&& entity.pos.x - entity.offset.x + entity.size.x > match.x1
			) {
				entity.pos.x = match.x1 - entity.size.x
				entity.vel.x = 0
			}

			if (
				entity.vel.x < 0
				&& entity.pos.x - entity.offset.x < match.x2
			) {
				entity.pos.x = match.x2 + entity.offset.x
				entity.vel.x = 0
			}
		})
	}

	checkY(entity) {
		let y

		if (entity.vel.y > 0) {
			y = entity.pos.y + entity.size.y
		} else if (entity.vel.y < 0) {
			y = entity.pos.y - entity.offset.y
		} else {
			return
		}

		const matches = this.tiles.searchByRange(
			entity.pos.x, entity.pos.x + entity.size.x,
			y, y + entity.offset.y + entity.size.y
		)

		matches.map(match => {
			if (!match) return
			if (!match.tile.name.includes('wall')) return

			if (
				entity.vel.y > 0
				&& entity.pos.y + entity.size.y + entity.offset.y > match.y1
			) {
				entity.pos.y = match.y1 - entity.size.y - entity.offset.y
				entity.vel.y = 0
			}

			if (
				entity.vel.y < 0
				&& entity.pos.y + entity.offset.y < match.y2
			) {
				entity.pos.y = match.y2 - entity.offset.y
				entity.vel.y = 0
			}
		})
	}

	test(entity) {
		this.checkY(entity)
		this.checkX(entity)
	}
}
