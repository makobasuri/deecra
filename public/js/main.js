import SpriteSheet from './SpriteSheet.js';
import {loadTileset, loadLevel} from './loaders.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawBackground(background, context, sprites) {
	background.ranges.map(([x1, x2, y1, y2]) => {
		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++) {
				sprites.drawTile(background.tile, context, x, y)
			}
		}
	})
}

loadTileset('/tiles/DungeonCrawl_ProjectUtumnoTileset.png')
	.then(image => {
		const sprites = new SpriteSheet(image);
		sprites.define('ground-stone', 22, 13);
		sprites.define('wall-stone', 23, 16);

		loadLevel('dungeon-1').then(lvl => {
			lvl.backgrounds
				.map(bg => drawBackground(bg, ctx, sprites))
		})
	})
