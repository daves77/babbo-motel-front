import gameConfig from '../gameConfig'
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

      requestAnimationFrame(() => step())
    }

    step()
  }

  init () {
    this.map = new OverworldMap({
      lowerSrc: gameConfig.DemoRoom.lowerSrc
    })

    this.startGameLoop()
  }
}
