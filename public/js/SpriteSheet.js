import {createBuffer} from './buffer.js';

export default class SpriteSheet {
	constructor(image, width = 32, height = 32) {
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map();
	}

	define(name, x, y, width, height) {
		const buffer = createBuffer(this.width, this.height);

		buffer.getContext('2d').drawImage(
			this.image,
			x, y,
			width, height,
			0, 0,
			this.width, this.height
		)

		this.tiles.set(name, buffer);

		return this
	}

	defineTile(name, x, y) {
		this.define(name, x * this.width, y * this.height, this.width, this.height)

		return this;
	}

	draw(name, context, x, y, w, h) {
		(w && h)
		? context.drawImage(
				this.tiles.get(name),
				x, y,
				w, h
		)
		: context.drawImage(
				this.tiles.get(name),
				x, y
		)

		return this
	}

	drawTile(name, context, x, y) {
		this.draw(name, context, x * this.width, y * this.height)
	}
}
