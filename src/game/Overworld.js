import gameConfig from '../gameConfig'
import DirectionInput from './DirectionInput'
import OverworldMap from './OverworldMap'

export default class Overworld {
  constructor (config) {
    this.images = config.images
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext('2d')
  }

  startGameLoop () {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.map.drawLowerImage(this.ctx)

      Object.values(this.map.gameObjects.person).forEach(obj => {
        obj.update({
          direction: this.directionInput.direction,
          map: this.map
        })
      })

      const gameObjects = [
        // ...Object.values(this.map.gameObjects.furniture),
        ...Object.values(this.map.gameObjects.person)
      ]

      // Draw game objects
      // sorting objects based on their position on the y axis so that they appear layered
      gameObjects.sort((a, b) => a.y - b.y).forEach((obj) => {
        obj.sprite.draw(this.ctx)
      })

      requestAnimationFrame(() => step())
    }

    step()
  }

  init () {
    this.map = new OverworldMap({
      lowerSrc: gameConfig.DemoRoom.lowerSrc,
      gameObjects: gameConfig.DemoRoom.gameObjects,
      walls: gameConfig.DemoRoom.walls
    })

    this.map.mountObjects()

    this.directionInput = new DirectionInput()
    this.directionInput.init()

    this.startGameLoop()
  }
}
