import utils from '../utils'

export default class Customise {
  constructor (config) {
    this.ctx = config.ctx

    this.body = new Image()
    this.body.src = config.body

    this.eye = new Image()
    this.eye.src = config.eye

    this.outfit = new Image()
    this.outfit.src = config.src

    this.hair = new Image()
    this.hair.src = config.src
  }

  drawAttribute (attribute) {
    attribute.crossOrigin = 'anonymous'
    this.ctx.drawImage(
      attribute,
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

  init () {
    this.drawAttribute(this.body)
    this.drawAttribute(this.eye)
    this.drawAttribute(this.outfit)
    this.drawAttribute(this.hair)
  }
}
