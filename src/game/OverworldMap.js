import utils from '../utils'
import OverworldEvent from './OverworldEvent'
export default class OverworldMap {
  constructor (config) {
    this.overworld = null
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc
    this.cutSceneSpaces = config.cutSceneSpaces || []

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc

    this.gameObjects = config.gameObjects
    this.walls = config.walls || []
  }

  drawLowerImage (ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  drawUpperImage (ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  async startCutscene (events) {
    this.isCutScenePlaying = true

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this
      })

      await eventHandler.init()
    }
    this.isCutScenePlaying = false
  }

  isSpaceTaken (currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }

  mountObjects () {
    Object.keys(this.gameObjects.person).forEach(key => {
      const object = this.gameObjects.person[key]
      object.id = key
      // object.mount(this)
    })
  }

  checkForFootstepCutscene (player) {
    const match = this.cutSceneSpaces[`${player.x},${player.y}`]
    console.log(match)
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events)
    }
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
