import GameObject from './GameObject'
import { update } from 'firebase/database'

export default class Person extends GameObject {
  constructor (config) {
    super(config)
    this.movingProgressRemaining = 0
    this.isPlayerControlled = config.isPlayerControlled || false
    this.playerRef = config.playerRef
    this.directionMap = {
      up: ['y', -1],
      down: ['y', 1],
      left: ['x', -1],
      right: ['x', 1]
    }
  }

  updatePosition () {
    const [property, change] = this.directionMap[this.direction]
    this.movingProgressRemaining -= 1
    if (this.isPlayerControlled) {
      this[property] += change
      // update needs to go here
      update(this.playerRef, { x: this.x, y: this.y })
      // set(this.playerRef, { x: this.x, y: this.y, direction: this.direction, id: this.id })
    }
  }

  updateSprite () {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`)
      return
    }
    this.sprite.setAnimation(`idle-${this.direction}`)
  }

  update (state) {
    console.log(state)
    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    } else {
      if (state.behavior === 'walk') {
        this.startBehavior(state, {
          type: 'walk',
          direction: state.direction
        })
      }
      this.updateSprite()
    }
  }

  startBehavior (state, behavior) {
    this.direction = behavior.direction
    console.log(this.direction)
    if (behavior.type === 'walk') {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return
      }
    }
    state.map.moveWall(this.x, this.y, this.direction)
    this.movingProgressRemaining = 16
    this.updateSprite()
  }
}
