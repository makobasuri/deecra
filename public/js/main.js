import { loadTiles } from './loadTiles.js';
import { loadLevel } from './loaders.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawBackground(background, context, sprites) {
	background.ranges.map(([x1, x2, y1, y2]) => {
		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++) {
				sprites.drawTile(background.tile, context, x, y);
			}
		}
	})
}

Promise.all([
	loadTiles(),
	loadLevel('dungeon-1')
]).then(([
	sprites,
	lvl
]) => {
	lvl.backgrounds.map(bg => drawBackground(bg, ctx, sprites))
	sprites.drawTile('char', ctx, 8, 2)
})
