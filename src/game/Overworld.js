import gameConfig from '../gameConfig'
import OverworldMap from './OverworldMap'
import DirectionInput from './DirectionInput'
import Person from './Person'

export default class Overworld {
  constructor (config) {
    this.images = config.images
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext('2d')
    this.player = config.player || null
  }

  startGameLoop () {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = 'black'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      const cameraPerson = this.player || { x: 0, y: 0 }

      this.map.drawLowerImage(this.ctx, cameraPerson)
      this.map.drawUpperImage(this.ctx, cameraPerson)

      Object.values(this.map.gameObjects.person).forEach((obj) => {
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
      gameObjects
        .sort((a, b) => a.y - b.y)
        .forEach((obj) => {
          obj.sprite.draw(this.ctx, cameraPerson)
        })

      requestAnimationFrame(() => step())
    }

    step()
  }

  updatePersons (state) {
    Object.values(this.map.gameObjects.person).forEach((person) => {
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
    this.playerRef = user.isPlayerControlled ? user.playerRef : null
    this.map.gameObjects.person[user.id] = new Person({
      x: user.x,
      y: user.y,
      currentAnimation: `idle-${user.direction}`,
      src: user.sprite,
      username: user.username,
      isPlayerControlled: user.isPlayerControlled,
      playerRef: user.isPlayerControlled ? this.playerRef : null
    })

    if (user.isPlayerControlled) {
      this.player = this.map.gameObjects.person[user.id]
      console.log(this.player)
      this.directionInput = new DirectionInput({
        playerRef: this.playerRef,
        person: this.player
      })
      this.directionInput.init()
    }
    this.map.mountObjects()
  }

  init (config = {}) {
    this.map = new OverworldMap({
      lowerSrc: config.lowerSrc || gameConfig.MainRoom.lowerSrc,
      upperSrc: config.upperSrc || gameConfig.MainRoom.upperSrc,
      gameObjects: config.gameObjects || gameConfig.MainRoom.gameObjects,
      walls: config.walls || gameConfig.MainRoom.walls,
      cutSceneSpaces: config.cutSceneSpaces || null
    })

    this.map.mountObjects()

    if (config.isCutScene) {
      this.map.checkForFootstepCutscene(this.player)
    }

    this.startGameLoop()
  }
}
