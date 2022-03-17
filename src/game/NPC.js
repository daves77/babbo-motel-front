
import Person from './Person'
import utils from '../utils'

export default class NPC extends Person {
  constructor (config) {
    super(config)
    this.isStanding = false
  }

  updatePosition () {
    const [property, change] = this.directionMap[this.direction]
    this[property] += change
    this.movingProgressRemaining -= 1

    if (this.movingProgressRemaining === 0) {
      // We finished the walk!
      utils.emitEvent('PersonWalkingComplete', {
        whoId: this.id
      })
    }
  }

  startBehavior (state, behavior) {
    // Set character direction to whatever behavior has
    this.direction = behavior.direction

    if (behavior.type === 'walk') {
      // Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior)
        }, 10)

        return
      }

      // Ready to walk!
      state.map.moveWall(this.x, this.y, this.direction)
      this.movingProgressRemaining = 16
      this.updateSprite(state)
    }

    if (behavior.type === 'stand') {
      this.isStanding = true
      setTimeout(() => {
        utils.emitEvent('PersonStandComplete', {
          whoId: this.id
        })
        this.isStanding = false
      }, behavior.time)
    }
  }
}
