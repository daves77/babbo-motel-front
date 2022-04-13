
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

  saveSprite (spriteCanvas, headCanvas) {
    const spriteCtx = spriteCanvas.getContext('2d')
    const headCtx = headCanvas.getContext('2d')

    Object.keys(this.attributes).forEach(attribute => {
      if (this.attributes[attribute]) {
        this.attributes[attribute].drawSpriteSheet(spriteCtx)
        this.attributes[attribute].drawSpriteHeadSheet(headCtx)
        // this.attributes[attribute].image.crossOrigin = 'anonymous'
      }
    })

    const spritesheet = spriteCanvas.toDataURL()
    const head = headCanvas.toDataURL()
    const spriteSheetBlob = utils.dataURItoBlob(spritesheet)
    const headBlob = utils.dataURItoBlob(head)
    return [spriteSheetBlob, headBlob]
  }

  updateAttribute (attribute, attributeObj) {
    this.attributes[attribute] = attributeObj
  }

  init () {
    this.refreshLoop()
  }
}
