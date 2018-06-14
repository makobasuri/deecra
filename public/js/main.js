import {loadTileset} from './loaders.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function createBuffer(width = 32, height = 32) {
	const newBuffer = document.createElement('canvas');
	newBuffer.width = width;
	newBuffer.height = height;
	newBuffer.getContext('2d');
	return newBuffer;
}

class SpriteSheet {
	constructor(image, width = 32, height = 32) {
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map();
	}

	define(name, x, y) {
		const buffer = createBuffer();
		// throws type error
		buffer.drawImage(
			this.image,
			x * this.width,
			y * this.height,
			this.width,
			this.height,
			0,
			0,
			this.width,
			this.height
		);
		this.tiles.set(name, buffer);

		return this
	}

	draw(name, context, x, y) {
		context.drawImage(
			this.tiles.get(name),
			x,
			y
		)
	}
}

loadTileset('/tiles/DungeonCrawl_ProjectUtumnoTileset.png')
	.then(image => {
		const sprites = new SpriteSheet(image);
		sprites.define('ground', 704, 416)
		sprites.draw('ground', ctx, 45, 45)
		ctx.drawImage(
			image,
			704, 416, 32, 32,
			0, 0, 32, 32
		)
	})
