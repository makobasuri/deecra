import SpriteSheet from './SpriteSheet.js';
import {loadTileset} from './loaders.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

loadTileset('/tiles/DungeonCrawl_ProjectUtumnoTileset.png')
	.then(image => {
		const sprites = new SpriteSheet(image);
		sprites.define('ground-stone', 22, 13);
		sprites.draw('ground-stone', ctx, 0, 0);
	})
