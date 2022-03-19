
export default class Customise {
  constructor (config) {
    this.canvas = config.canvas
    this.ctx = config.ctx

    this.attributes = {}
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
      }
    })

    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    window.location.href = image
  }

  updateAttribute (attribute, attributeObj) {
    this.attributes[attribute] = attributeObj
  }

  init () {
    this.refreshLoop()
  }
}
