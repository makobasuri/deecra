export default class Timer {
	constructor(deltaTime = 1/60) {
		this.accumulatedTime = 0
		this.lastTime = 0

		this.updateProxy = (time) => {
			this.accumulatedTime += (time - this.lastTime) / 1000

			while (this.accumulatedTime > deltaTime) {
				this.update(deltaTime)
				this.accumulatedTime -= deltaTime
			}

			this.lastTime = time

			this.enqueue()
		}
	}

	enqueue() {
		requestAnimationFrame(this.updateProxy)
	}

	start() {
		this.enqueue()
	}
}
