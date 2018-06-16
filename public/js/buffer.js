export function createBuffer(width = 32, height = 32) {
	const newBuffer = document.createElement('canvas');
	newBuffer.width = width;
	newBuffer.height = height;
	return newBuffer;
}
