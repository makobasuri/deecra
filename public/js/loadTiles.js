import SpriteSheet from './SpriteSheet.js'
import { loadTileset } from './loaders.js'

export function loadLvlTiles() {
	return loadTileset('/tiles/DungeonCrawl_ProjectUtumnoTileset.png')
		.then(image => {
			const sprites = new SpriteSheet(image)
			sprites.defineTile('ground-stone', 22, 13)
			sprites.defineTile('wall-stone', 23, 16)

			return sprites
	})
}

export function loadCharacter() {
	return loadTileset('/tiles/characters/steampunk_f10.png')
		.then(image => {
			const sprites = new SpriteSheet(image, 32, 46)
			console.log(sprites)
			sprites.define('idle', 0, 0, 32, 46, 32, 32)
			return sprites
		})
}
