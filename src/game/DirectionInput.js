import { update } from 'firebase/database'

export default class DirectionInput {
  constructor (config) {
    this.playerRef = config.playerRef
    this.heldDirection = []
    this.directionMap = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }
  }

  get direction () {
    return this.heldDirection[0]
  }

  // eslint-disable-next-line class-methods-use-this
  init () {
    document.addEventListener('keydown', (e) => {
      const dir = this.directionMap[e.code]
      if (dir && this.heldDirection.indexOf(dir) === -1) {
        this.heldDirection.unshift(dir)
      }
      update(this.playerRef, { direction: this.direction, behavior: 'walk' })
    })

    document.addEventListener('keyup', (e) => {
      const dir = this.directionMap[e.code]
      const index = this.heldDirection.indexOf(dir)
      if (index > -1) {
        this.heldDirection.splice(index, 1)
      }
      update(this.playerRef, { direction: null, behavior: 'idle' })
    })
  }
}
