import SpriteSheet from './SpriteSheet.js'
import { loadTileset } from './loaders.js'

export function loadTiles() {
	return loadTileset('/tiles/DungeonCrawl_ProjectUtumnoTileset.png')
		.then(image => {
			const sprites = new SpriteSheet(image)
			sprites.define('ground-stone', 22, 13)
			sprites.define('wall-stone', 23, 16)

			sprites.define('char', 42, 1)
			return sprites;
	})
}
