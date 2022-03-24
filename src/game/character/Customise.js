
import utils from '../../utils'
export default class Customise {
  constructor (config) {
    this.canvas = config.canvas
    this.ctx = config.ctx

    this.attributes = {}
  }

  get spriteAttributes () {
    return Object.keys(this.attributes).reduce((attributeObj, currentAttribute) => {
      attributeObj[currentAttribute] = this.attributes[currentAttribute].image.src
      return attributeObj
    }, {})
  }

  refreshLoop () {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      Object.keys(this.attributes).forEach(attribute => {
        if (this.attributes[attribute]) { this.attributes[attribute].draw(this.ctx) }
      })

      requestAnimationFrame(() => step())
    }

    step()
  }

  saveSprite (canvas) {
    const ctx = canvas.getContext('2d')

    Object.keys(this.attributes).forEach(attribute => {
      if (this.attributes[attribute]) {
        this.attributes[attribute].drawSpriteSheet(ctx)
        // this.attributes[attribute].image.crossOrigin = 'anonymous'
      }
    })

    const spritesheet = canvas.toDataURL()
    const blob = utils.dataURItoBlob(spritesheet)
    return blob
  }

  updateAttribute (attribute, attributeObj) {
    this.attributes[attribute] = attributeObj
  }

  init () {
    this.refreshLoop()
  }
}
