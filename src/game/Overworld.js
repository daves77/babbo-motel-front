import gameConfig from '../gameConfig'
import OverworldMap from './OverworldMap'
import DirectionInput from './DirectionInput'
import Person from './Person'

export default class Overworld {
  constructor (config) {
    this.images = config.images
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext('2d')
  }

  startGameLoop () {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.map.drawLowerImage(this.ctx)
      Object.values(this.map.gameObjects.person).forEach(obj => {
        obj.update({
          map: this.map,
          behavior: obj.behavior,
          direction: obj.direction
        })
      })

      const gameObjects = [
        // ...Object.values(this.map.gameObjects.furniture),
        ...Object.values(this.map.gameObjects.person)
      ]
      // Draw game objects
      // sorting objects based on their position on the y axis so that they appear layered
      gameObjects.sort((a, b) => a.y - b.y).forEach((obj) => {
        obj.sprite.draw(this.ctx)
      })

      requestAnimationFrame(() => step())
    }

    step()
  }

  updatePersons (state) {
    Object.values(this.map.gameObjects.person).forEach(person => {
      if (state[person.id]) {
        person.y = state[person.id].y
        person.x = state[person.id].x
        person.behavior = state[person.id].behavior

        // only updates if theres a change in direction
        if (state[person.id].direction) {
          person.direction = state[person.id].direction
        }
      }
    })
  }

  addPerson (user) {
    if (user.isPlayerControlled) {
      this.playerRef = user.playerRef
      this.directionInput = new DirectionInput({ playerRef: this.playerRef })
      this.directionInput.init()
    }
    this.map.gameObjects.person[user.id] = new Person({
      x: user.x,
      y: user.y,
      src: this.images.char,
      isPlayerControlled: user.isPlayerControlled,
      playerRef: user.isPlayerControlled ? this.playerRef : null
    })
    this.map.mountObjects()
  }

  init () {
    this.map = new OverworldMap({
      lowerSrc: gameConfig.DemoRoom.lowerSrc,
      gameObjects: gameConfig.DemoRoom.gameObjects,
      walls: gameConfig.DemoRoom.walls
    })

    this.map.mountObjects()

    this.startGameLoop()
  }
}
