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
	const bgBuffer = createBuffer(2000, 1400)
	const bgCtx = bgBuffer.getContext('2d')
	const tiles = STATE.tiles

	let startIndex, endIndex
	function redraw(drawFrom, drawTo) {
		if (drawFrom === startIndex && drawTo === endIndex) {
			return
		}

		startIndex = drawFrom
		endIndex = drawTo

		for (let x = startIndex; x <= endIndex; ++x) {
			const col = tiles.grid[x]
			if (col) {
				col.map((tile, y) => sprites.drawTile(
					tile.name, bgCtx, x - startIndex, y
				))
			}
		}
	}

	return function drawBackgroundLayer(context, camera) {
		const drawWidth = Math.floor(camera.size.x / 32)
		const drawFrom = Math.floor(camera.pos.x / 32)
		const drawTo = drawFrom + drawWidth
		redraw(drawFrom, drawTo)
		context.drawImage(bgBuffer, -camera.pos.x % 32, -camera.pos.y)
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

export function createCameraLayer(cameraToDraw) {
	return function drawCameraRect(context, fromCamera) {
		context.strokeStyle = 'purple'
		context.beginPath()
		context.rect(
			cameraToDraw.pos.x - fromCamera.pos.x,
			cameraToDraw.pos.y - fromCamera.pos.y,
			cameraToDraw.size.x, cameraToDraw.size.y
		)
		context.stroke()
	}
}
