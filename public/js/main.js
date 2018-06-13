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
	.then(image => ctx.drawImage(image, 0, 0, 100, 100, 20, 30, 100, 100))
