import utils from '../utils'
export default class OverworldMap {
  constructor (config) {
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc
    this.gameObjects = config.gameObjects
    this.walls = config.walls
  }

  drawLowerImage (ctx) {
    ctx.drawImage(
      this.lowerImage,
      0,
      0
    )
  }

  isSpaceTaken (currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }

  mountObjects () {
    Object.keys(this.gameObjects.person).forEach(key => {
      const object = this.gameObjects.person[key]
      object.id = key
      object.mount(this)
    })
  }

  addWall (x, y) {
    this.walls[`${x},${y}`] = true
  }

  removeWall (x, y) {
    delete this.walls[`${x},${y}`]
  }

  moveWall (wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const { x, y } = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x, y)
  }
}
