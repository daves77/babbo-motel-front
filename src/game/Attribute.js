import utils from '../utils'

export default class Attribute {
  constructor (config) {
    this.image = new Image()
    this.image.src = config.src
    this.image.crossOrigin = 'anonymous'
    this.image.onload = () => {
      this.isLoaded = true
    }
  }

  draw (ctx) {
    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        utils.withGrid(19),
        utils.withGrid(2),
        utils.withGrid(1),
        utils.withGrid(2),
        0,
        0,
        16,
        32
      )
    }
  }
}
