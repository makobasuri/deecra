const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = '/tiles/DungeonCrawl_ProjectUtumnoTileset.png';

ctx.drawImage(image, 0, 0, 100, 100, 20, 30, 100, 100)
