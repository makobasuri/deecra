import STATE, { tileCollider } from './STATE.js'
import {createBuffer} from './buffer.js'

export function drawLayers(camera, context) {
	STATE.layers.map(layer => layer(camera, context))
}

export function createSpriteLayer(entities, width = 64, height = 64) {
	const spriteBuffer = createBuffer(width, height)
	const spriteBufferCtx = spriteBuffer.getContext('2d')

	return function drawSpriteLayer(context) {
		entities.map(entity => {
			spriteBufferCtx.clearRect(0, 0, width, height)

			entity.draw(spriteBufferCtx)

			context.drawImage(
				spriteBuffer,
				entity.pos.x - camera.pos.x,
				entity.pos.y - camera.pos.y
			)
		})
	}
}

export function createBgLayer(STATE, sprites) {
	const bgBuffer = createBuffer(2000, 1400);

	STATE.tiles.each(
		(tile, x, y) => {
			sprites.drawTile(
				tile.name, bgBuffer.getContext('2d'), x, y
			)

			console.log(tile, x, y)
		}
	)

	return function drawBackgroundLayer(context, camera) {
		context.drawImage(bgBuffer, -camera.pos.x, -camera.pos.y)
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

	return function drawCollision(context, camera) {
		resolvedTiles.map(({x, y}) => {
			context.strokeStyle = 'blue'
			context.beginPath()
			context.rect(
				x * tileSize - camera.pos.x,
				y * tileSize - camera.pos.y,
				tileSize, tileSize
			)
			context.stroke()
		})

		STATE.entities.map(entity => {
			context.strokeStyle = 'red'
			context.beginPath()
			context.rect(
				entity.pos.x + entity.offset.x - camera.pos.x,
				entity.pos.y + entity.offset.y - camera.pos.y,
				entity.size.x, entity.size.y
			)
			context.stroke()
		})

		resolvedTiles.length = 0
	}
}
