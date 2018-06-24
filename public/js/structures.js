export class Matrix {
	constructor() {
		this.grid = []
	}

	each(callback) {
		this.grid.map(
			(column, x) => column.map(
				(value, y) => callback(value, x, y)
			)
		)
	}

	get(x, y) {
		return this.grid[x] ? this.grid[x][y] : false
	}

	set(x, y, value) {
		this.grid[x]
			? this.grid[x][y] = value
			: this.grid[x] = []
	}
}

export class Vec2 {
	constructor(x, y) {
		this.set(x, y)
	}

	set(x, y) {
		this.x = x
		this.y = y
	}
}
