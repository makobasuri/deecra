import STATE, { tileCollider } from './STATE.js'
import {createBuffer} from './buffer.js'

export function drawLayers(context) {
	STATE.layers.map(layer => layer(context))
}

export function createSpriteLayer(entities) {
	return function drawSpriteLayer(context) {
		entities.map(entity => entity.draw(context))
	}
}

export function createBgLayer(STATE, sprites) {
	const bgBuffer = createBuffer(300, 200);

	STATE.tiles.each(
		(tile, x, y) => sprites.drawTile(
			tile.name, bgBuffer.getContext('2d'), x, y
		)
	)

	return function drawBackgroundLayer(context) {
		context.drawImage(bgBuffer, 0, 0)
	}
}

export function createCollisionLayer(STATE) {
	const resolvedTiles = []
	const tileResolver = tileCollider.tiles
	const tileSize = tileResolver.tileSize
	const getByIndexOriginal = tileResolver.getByIndex

	tileResolver.getByIndex = function getByIndexFake(x, y) {
		resolvedTiles.push({x, y})
		return getByIndexOriginal.call(tileResolver, x, y)
	}

	return function drawCollision(context) {
		resolvedTiles.map(({x, y}) => {
			context.strokeStyle = 'blue'
			context.beginPath()
			context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
			context.stroke()
		})

		STATE.entities.map(entity => {
			context.strokeStyle = 'red'
			context.beginPath()
			context.rect(
				entity.pos.x + entity.offset.x,
				entity.pos.y + entity.offset.y,
				entity.size.x, entity.size.y
			)
			context.stroke()
		})

		resolvedTiles.length = 0
	}
}
