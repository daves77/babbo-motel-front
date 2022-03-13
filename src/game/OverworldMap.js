
export default class OverworldMap {
  constructor (config) {
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc
  }

  drawLowerImage (ctx) {
    ctx.drawImage(
      this.lowerImage,
      0,
      0
    )
  }
}
