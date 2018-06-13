const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		});
		image.src = url;
	});
}

loadImage('/tiles/DungeonCrawl_ProjectUtumnoTileset.png')
	.then(image => ctx.drawImage(
		image,
		704, 416, 32, 32,
		0, 0, 32, 32
	))
