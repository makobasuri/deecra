import {createBuffer} from './buffer.js';

export default class SpriteSheet {
	constructor(image, width = 32, height = 32) {
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map();
	}

	define(name, x, y) {
		const buffer = createBuffer();
		buffer.getContext('2d').drawImage(
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
		return this
	}

	drawTile(name, context, x, y) {
		this.draw(name, context, x * this.width, y * this.height)
	}
}
