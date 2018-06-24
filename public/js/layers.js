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
		context.strokeStyle = 'blue'
		resolvedTiles.map(({x, y}) => {
			context.beginPath()
			context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
			context.stroke()
			console.log(x, y)
		})

		resolvedTiles.length = 0
	}
}
