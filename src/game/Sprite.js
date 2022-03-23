
import utils from '../utils'

const defaultSpriteAnimations = {
  'idle-down': [
    [3, 0]
  ],
  'idle-right': [
    [0, 0]
  ],
  'idle-left': [
    [2, 0]
  ],
  'idle-up': [
    [1, 0]
  ],
  'walk-down': [
    [18, 4], [19, 4], [20, 4], [21, 4], [22, 4], [23, 4]
  ],
  'walk-right': [
    [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4]
  ],
  'walk-left': [
    [12, 4], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4]
  ],
  'walk-up': [
    [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4]
  ]
}

export default class Sprite {
  constructor (config) {
    this.image = new Image()
    this.image.src = config.src
    this.image.onload = () => {
      this.isLoaded = true
    }

    this.dimensions = config.dimensions || { x: 1, y: 2 }
    this.animations = config.animations || defaultSpriteAnimations

    this.currentAnimation = config.currentAnimation || 'idle-down'
    this.currentAnimationFrame = 0

    this.animationFrameLimit = config.animationFrameLimit || 8
    this.animationFrameProgress = this.animationFrameLimit

    this.gameObject = config.gameObject
    this.name = config.name
  }

  get frame () {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation (animation) {
    if (this.currentAnimation !== animation) {
      this.currentAnimation = animation
      this.currentAnimationFrame = 0
      this.animationFrameProgress = this.animationFrameLimit
    }
  }

  updateAnimationProgress () {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1
      return
    }
    this.animationFrameProgress = this.animationFrameLimit
    this.currentAnimationFrame += 1
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  // eslint-disable-next-line no-unused-vars
  draw (ctx, cameraPerson) {
    const x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x
    const y = this.gameObject.y - 6 - 16 + utils.withGrid(6) - cameraPerson.y
    const [frameX, frameY] = this.frame
    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        utils.withGrid(frameX),
        utils.withGrid(frameY),
        utils.withGrid(this.dimensions.x),
        utils.withGrid(this.dimensions.y),
        x,
        y,
        utils.withGrid(this.dimensions.x),
        utils.withGrid(this.dimensions.y)
      )
      if (this.name) {
        ctx.font = '10px Arial'
        ctx.fillText(this.name, x - (this.name.length + 2), y + 5)
      }
    }
    this.updateAnimationProgress()
  }
}
