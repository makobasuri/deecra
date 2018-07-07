import STATE from './STATE.js'
import SpriteSheet from './SpriteSheet.js'
import { createBgLayer, createSpriteLayer, createCollisionLayer } from './layers.js'

export function loadTileset(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		});
		image.src = url;
	});
}

function loadJSON(url) {
	return fetch(url)
		.then(result => result.json())
}

export function loadSpriteSheet(name) {
	return loadJSON(`/sprites/${name}.json`)
		.then(sheetSpec => Promise.all([
			sheetSpec,
			loadTileset(sheetSpec.imageURL)
		]))
		.then(([sheetSpec, image]) => {
			const sprites = new SpriteSheet(
				image, sheetSpec.tileW, sheetSpec.tileH
			)

			if (sheetSpec.tiles) {
				sheetSpec.tiles.map(tileSpec => {
					sprites.defineTile(
						tileSpec.name,
						tileSpec.index[0], tileSpec.index[1], sheetSpec.tileW, sheetSpec.tileH
					)
				})
			}

			if (sheetSpec.frames) {
				sheetSpec.frames.map(frameSpec => {
					sprites.define(frameSpec.name, ...frameSpec.rect)
				})
			}

			return sprites
		})
}

function createTiles(STATE, backgrounds) {
	function applyRange(background, xStart, xLength, yStart, yLength) {
		const xEnd = xStart + xLength
		const yEnd = yStart + yLength
		for (let x = xStart; x < xEnd; x++) {
			for (let y = yStart; y < yEnd; y++) {
				STATE.tiles.set(x, y, {
					name: background.tile
				});
			}
		}
	}

	backgrounds.map(
		background => background.ranges.map(range => {
			let xStart, xLength, yStart, yLength

			switch (range.length) {
				case 4:
					[xStart, xLength, yStart, yLength] = range
					applyRange(background, xStart, xLength, yStart, yLength)
					break;
				case 3:
					[xStart, xLength, yStart] = range
					applyRange(background, xStart, xLength, yStart, 1)
					break;
				case 2:
					[xStart, yStart] = range
					applyRange(background, xStart, 1, yStart, 1)
					break;
			}

		})
	)
}

export function loadLevel(name) {
	return loadJSON(`/levels/${name}.json`)
		.then(levelSpec => Promise.all([
			levelSpec,
			loadSpriteSheet(levelSpec.spriteSheet)
		])).then(([levelSpec, lvlTiles]) => {
			createTiles(STATE, levelSpec.backgrounds)

			const backgroundLayer = createBgLayer(STATE, lvlTiles)
			const spriteLayer = createSpriteLayer(STATE.entities)
			const collisionLayer = createCollisionLayer(STATE)

			STATE.addLayers([
				backgroundLayer,
				spriteLayer,
				collisionLayer
			])

			return STATE
		})
}
