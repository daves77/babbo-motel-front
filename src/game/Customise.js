
export default class Customise {
  constructor (config) {
    this.canvas = config.canvas
    this.ctx = config.ctx

    this.Body = null
    this.Eyes = null
    this.Outfit = null
    this.Hairstyle = null
    this.Accessory = null
  }

  refreshLoop () {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      const attributes = [this.Body, this.Eyes, this.Outfit, this.Hairstyle, this.Accessory]
      attributes.forEach(attribute => {
        if (attribute) { attribute.draw(this.ctx) }
      })

      requestAnimationFrame(() => step())
    }

    step()
  }

  updateAttribute (attribute, attributeObj) {
    this[attribute] = attributeObj
  }

  init () {
    this.refreshLoop()
  }
}
