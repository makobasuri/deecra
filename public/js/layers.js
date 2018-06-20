import STATE from './STATE.js'
import {createBuffer} from './buffer.js'

export function drawLayers(context) {
	STATE.layers.map(layer => layer(context))
}

export function createSpriteLayer(sprites, pos) {
	return function drawSpriteLayer(context) {
		sprites.draw('idle', context, pos.x, pos.y)
	}
}

function drawBackground(background, context, sprites) {
	background.ranges.map(([x1, x2, y1, y2]) => {
		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++) {
				sprites.drawTile(background.tile, context, x, y);
			}
		}
	});
}

export function createBgLayer(backgrounds, sprites) {
	const bgBuffer = createBuffer(300, 200);
	backgrounds.map(bg => drawBackground(bg, bgBuffer.getContext('2d'), sprites))

	return function drawBackgroundLayer(context) {
		context.drawImage(bgBuffer, 0, 0)
	}
}
